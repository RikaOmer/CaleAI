class Node:
    def __init__(self, events, remaining_tasks, cost, heuristic):
        self.events = events  # Scheduled events
        self.remaining_tasks = remaining_tasks  # List of tasks left to schedule
        self.cost = cost  # The cost to reach this node
        self.heuristic = heuristic  # The heuristic for the node

    def total_cost(self):
        return self.cost + self.heuristic

    def __lt__(self, other):
        """For heap queue to compare nodes based on total cost (A* uses f = g + h)."""
        return self.total_cost() < other.total_cost()
