from datetime import datetime, timedelta,time
from heapq import heappop, heappush
from task.models import Task
from event.models import Event
from users.models import User
from calendars.generator.Node import Node
import random
import calendar

class AStarScheduler:
    def __init__(self, user_id, start_date, end_date):
        self.user = User.objects.get(id=user_id)
        self.start_date = start_date
        self.end_date = end_date

    def fetch_tasks(self):
        """Fetch user tasks from the database."""
        return Task.objects.filter(user_id=self.user)

    def create_next_event(self, task, current_date, last_event_time):
        """Generates the next possible event for the task based on its frequency."""
        if isinstance(last_event_time, time):
            last_event_time = datetime.combine(current_date, last_event_time)
        next_start_time = last_event_time + timedelta(minutes=10)
        next_end_time = next_start_time + timedelta(minutes=task.duration)

        # do not start a task after 8:00 PM
        while next_start_time.hour<20:
            if next_end_time.date() > self.end_date.date():
                return None

            if task.is_morning and next_start_time.hour >12:
                return None
            
            if task.is_noon and not self.is_noon_time(next_start_time.hour):
                next_start_time+=timedelta(minutes=10)
                next_end_time+=timedelta(minutes=10)
                continue
            
            if task.is_evening and not self.is_evening_time(next_start_time.hour):
                next_start_time+=timedelta(minutes=10)
                next_end_time+=timedelta(minutes=10)
                continue

            return Event(
                user_id=self.user,
                task_id=task,
                from_time=next_start_time.time(),
                to_time=next_end_time.time(),
                date=next_start_time.date(),
                is_constant=task.from_time is not None and task.to_time is not None
            )
        
        return None

    def find_available_slot(self,events, candidate_date, task_duration):
        """
        Finds the next available time slot for a given day.
        Assumes business hours are from 08:00 to 18:00.
        Returns the available from_time and the to_time.
        """
        business_start = time(8, 0)  # Start of the business day (8:00 AM)
        business_end = time(18, 0)  # End of the business day (6:00 PM)

        # Get all events for the current day
        day_events = [event for event in events if event.date == candidate_date]

        # Sort events by their starting time
        day_events.sort(key=lambda event: event.from_time)

        # Look for gaps between events or from the start of the business day
        last_end_time = business_start

        for event in day_events:
            # Calculate the time difference between the last event end time and the next event's start time
            gap = (datetime.combine(candidate_date, event.from_time) - 
                datetime.combine(candidate_date, last_end_time)).total_seconds() / 60
            
            if gap >= task_duration:  # If there's enough space for the task
                return last_end_time, (datetime.combine(candidate_date, last_end_time) + timedelta(minutes=task_duration)).time()

            last_end_time = event.to_time

        # If no gaps are found, return the next available time after the last event if it fits
        remaining_time = (datetime.combine(candidate_date, business_end) - 
                        datetime.combine(candidate_date, last_end_time)).total_seconds() / 60
        if remaining_time >= task_duration:
            return last_end_time, (datetime.combine(candidate_date, last_end_time) + timedelta(minutes=task_duration)).time()

        # If no available time in the business day, return None
        return None, None

    def schedule(self,constant_events):
        """Runs the A* algorithm to schedule tasks for the full business week (Sunday to Thursday)."""
        unsorted_tasks = self.fetch_tasks()
        tasks = sorted(unsorted_tasks, key=lambda task: (not task.is_morning, not task.is_noon, not task.is_evening))

        current_date = self.start_date

        events = []
        for constant_event in constant_events:
            # Directly add the constant event without modifying `from_time` or `to_time`
            event = Event(
                user_id=constant_event.user_id,
                task_id=constant_event.task_id,
                from_time=constant_event.from_time,
                to_time=constant_event.to_time,
                is_constant=True,
                date=constant_event.date
            )
            events.append(event) # Append the constant event to the events list
        
        while current_date <= self.end_date:
            # Skip non-business days (Friday and Saturday)
            day_of_week = current_date.weekday()
            if day_of_week not in [0,1,2,3,6]:  # Skips Friday (5) and Saturday (6)
                current_date += timedelta(days=1)
                current_date = datetime.combine(current_date, time(8, 0))  # Start next business day at 8:00 AM
                continue

            for task in tasks:
                if task.frequency != "daily":
                    continue

                # Determine time range based on task preference flags
                start_time, end_time = self.get_time_range(task)

                # Start checking from the beginning of the preferred time range
                current_time = datetime.combine(current_date.date(), start_time)
                scheduled = False

                while current_time.time() <= end_time and not scheduled:
                    # Calculate the end time of the task based on its duration
                    task_end_time = (current_time + timedelta(minutes=task.duration)).time()

                    # Create a potential event for this time slot
                    next_event = Event(
                        user_id=task.user_id,
                        task_id=task,
                        from_time=current_time.time(),
                        to_time=task_end_time,
                        is_constant=False,
                        date=current_date.date()
                    )

                    # Check for conflicts with existing events
                    if not self.is_conflict(next_event, events):
                        # No conflict, so we can schedule the event
                        events.append(next_event)
                        scheduled = True  # Mark as scheduled to exit the loop

                    # Move to the next available time slot (e.g., increment by 15 minutes)
                    current_time += timedelta(minutes=15)

            # Move to the next day and reset the time to the start of the day
            current_date += timedelta(days=1)
            current_date = datetime.combine(current_date, time(8, 0))  # Start the next day at 8:00 AM

        business_days = [0,1,2,3,6]
        business_start_time = time(8, 0)
        business_end_time = time(18, 0) 
        scheduled_weeks = {}

        # Weekly scheduling
        for task in tasks:
            if task.frequency != "weekly":
                continue

            current_date = self.start_date

            while current_date <= self.end_date:
                # Determine the start of the current week (Sunday)
                week_start = current_date - timedelta(days=current_date.weekday())
                week_key = (task.id, week_start.date())  # Unique key for the task-week pair

                # Skip scheduling if this task is already scheduled for this week
                if week_key in scheduled_weeks:
                    current_date += timedelta(weeks=1)
                    continue

                # Shuffle business days to randomize assignment within the business week
                day_offsets = list(business_days)
                random.shuffle(day_offsets)

                # Iterate over business days in randomized order
                task_scheduled = False
                for day_offset in day_offsets:
                    candidate_date = current_date + timedelta(days=(day_offset - current_date.weekday()) % 7)

                    # Ensure the candidate date is within the scheduling range and only on defined business days
                    if candidate_date < self.start_date or candidate_date > self.end_date or candidate_date.weekday() not in business_days:
                        continue

                    # Check available time slots within the day
                    current_time = datetime.combine(candidate_date, business_start_time)
                    while current_time.time() < business_end_time and not task_scheduled:
                        task_end_time = (current_time + timedelta(minutes=task.duration)).time()

                        # Create the next event
                        next_event = Event(
                            user_id=task.user_id,
                            task_id=task,
                            from_time=current_time.time(),
                            to_time=task_end_time,
                            is_constant=False,
                            date=candidate_date.date()
                        )

                        # Check for conflicts
                        if not self.is_conflict(next_event, events):
                            events.append(next_event)  # Add event if no conflict
                            scheduled_weeks[week_key] = True  # Mark the task as scheduled for this week
                            task_scheduled = True
                            break

                        # Move to the next 15-minute slot
                        current_time += timedelta(minutes=15)

                    if task_scheduled:
                        break  # Move to the next week after scheduling

                # Move to the start of the next week
                current_date += timedelta(weeks=1)
        
        start_date = self.start_date.date()
        end_date = self.end_date.date()
        for task in tasks:
            if task.frequency != "monthly":
                continue

            # Start scheduling from the beginning month and iterate until the end month
            current_date = start_date

            while current_date <= end_date:
                # Get the last day of the current month
                _, last_day = calendar.monthrange(current_date.year, current_date.month)
                month_end_date = datetime(current_date.year, current_date.month, last_day).date()

                # Select business days within the current month (Sunday to Thursday)
                monthly_business_days = [
                    day for day in range(1, last_day + 1)
                    if datetime(current_date.year, current_date.month, day).weekday() in business_days
                ]

                # Choose a random day from the available business days of the current month
                if monthly_business_days:
                    random_day = random.choice(monthly_business_days)
                    candidate_date = datetime(current_date.year, current_date.month, random_day).date()

                    # Ensure candidate_date is within the specified end date
                    if candidate_date <= end_date:
                        # Find the next available time slot for this candidate date
                        available_from_time, available_to_time = self.find_available_slot(events, candidate_date, task.duration)

                        if available_from_time and available_to_time:
                            # Create and append the event
                            next_event = Event(
                                user_id=task.user_id,
                                task_id=task,
                                from_time=available_from_time,
                                to_time=available_to_time,
                                is_constant=False,
                                date=candidate_date
                            )
                            events.append(next_event)

                # Move to the first day of the next month
                current_date = month_end_date + timedelta(days=1)
        return events
    
    def is_noon_time(self, hour):
        """Check if the given time is in the afternoon (between 12:00 PM and 6:00 PM)."""
        return hour >= 12 and hour < 17
    
    def is_evening_time(self, hour):
        """Check if the given time is in the evening (after 6:00 PM)."""
        return hour >= 17
    
    def should_schedule_today(self, task, current_date):
        """Determine if a task should be scheduled on a particular day based on its frequency."""
        if task.frequency == 'daily':
            return True
        elif task.frequency == 'weekly':
            # Schedule on the same day of the week as the start date, only during the business week
            return current_date.weekday() in range(0, 5)
        elif task.frequency == 'monthly':
            # Schedule on the same day of the month, only during the business week
            return current_date.day == self.start_date.day() and current_date.weekday() in range(0, 5)
        return False
    
    def get_time_range(self,task):
        """Return the time range based on task preference flags."""
        
        morning_range = (time(8, 0), time(11, 59))
        noon_range = (time(12, 0), time(15, 59))
        evening_range = (time(16, 0), time(18, 0))
        if task.is_morning:
            return morning_range
        elif task.is_noon:
            return noon_range
        elif task.is_evening:
            return evening_range
        else:
            # Default to the entire business day if no preference
            return (time(8, 0), time(18, 0))

    def is_conflict(self,new_event, events):
        """Check if the new_event conflicts with any existing events."""
        for event in events:
            if event.date == new_event.date and not (
                new_event.to_time <= event.from_time or new_event.from_time >= event.to_time
            ):
                return True
        return False