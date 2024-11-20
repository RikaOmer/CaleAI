# CALE AI

## Project Description

This project is an AI-powered calendar that creates the best schedule for users. It uses advanced algorithms and machine learning techniques to optimize scheduling based on user preferences, commitments, and historical data.

## Features

- **AI-Powered Scheduling:** Uses machine learning to understand your habits and preferences, creating a personalized schedule.
- **Optimized Time Management:** Allocates time efficiently based on your tasks, meetings, and personal time.
- **User-Friendly Interface:** Easy to use, intuitive design that makes scheduling a breeze.

## Running the Project

Follow these steps to get the project up and running on your local machine:

### Backend

1. Install the dependencies:

    ```
    pip install -r requirements.txt
    ```

1.2 Update const API_URL in manager.py

1.3 Run python manage.py makemigrations and then run python manage.py migrate

2. Run the Django server:

    ```
    python manage.py runserver 0.0.0.0:8000
    ```

### Frontend

1. Navigate to the frontend directory:

    ```
    cd frontend
    ```

2. Start the Expo server:

    ```
    npx expo start
    ```

3. Download the Expo Go app on your mobile device to view the application.

Please ensure that you have the necessary environment set up and all the dependencies installed before running the project.
