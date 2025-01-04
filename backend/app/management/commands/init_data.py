import random
from getpass import getpass

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from app.models import Task, User

TASKS = [
    "Buy groceries",
    "Do laundry",
    "Clean house",
    "Go to the gym",
    "Cook dinner",
    "Walk the dog",
    "Take out the trash",
    "Mow the lawn",
    "Do the dishes",
]

DATES = [
    "2025-01-01",
    "2025-01-02",
    "2025-01-03",
    "2025-01-04",
]


def populate_tasks(user: User) -> None:
    for task in TASKS:
        for date in DATES:
            Task.objects.get_or_create(
                name=task,
                category=random.choice(Task.Category.values),
                isDone=random.choice([True, False]),
                date=date,
                user=user,
            )


def create_default_admin() -> User:
    email = ""
    username = input("Enter username for default admin: ")
    passwd = getpass("Enter password for default admin: ")
    return User.objects.create_superuser(username, email, passwd)


class Command(BaseCommand):
    help = "Initializes data"

    def handle(self, *args, **options):
        try:
            admin = create_default_admin()
            populate_tasks(admin)

            self.stdout.write(self.style.SUCCESS("Successfully initialized data."))
        except Exception as e:
            raise CommandError(f"Error: {e}")
