# GPSProtectionDjango

GPSProtectionDjango is a Django-based web application designed to provide web app for our project. This application follows the standard Django project architecture and operates seamlessly with a typical setup.

## Live Demo

Experience the live version of the project here: [GPSProtectionDjango Live Demo](https://plamennikoleta.pythonanywhere.com/)

## Getting Started

These instructions will guide you through setting up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- Python 3.x
- Django (The version used in the project)

As the project uses SQLite3, which comes as Django's default database, no additional database setup is required.

### Setting Up

1. Clone the repository to your local machine (Alternatively, download the code from the provided source):

    ```bash
    git clone https://github.com/PTrendafilov/GPSProtection-Django.git
    ```

2. Navigate to the project directory:

    ```bash
    cd GPSProtectionDjango
    ```

3. The project can be run without a virtual environment since it's using only Django and the standard library, but using a virtual environment is still recommended:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

4. Since the project uses Django, ensure Django is installed. If not, install it using pip:

    ```bash
    pip install django
    ```

5. Run the development server:

    ```bash
    python manage.py runserver
    ```

6. Visit `http://127.0.0.1:8000/` in your web browser to view the application running locally.

## Features

- Creating accounts
- Managing accounts on both phones and django app
- In future there will be added a web visualization on the location of the connected devices
- In future there there will be added Safety area

## Creators

- Made by Plamen Trendafilov and Nikoleta Rasheva
