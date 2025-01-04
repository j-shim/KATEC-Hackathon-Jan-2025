from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom User model to use instead of the default one provided by Django."""

    pass


class Task(models.Model):
    class Category(models.TextChoices):
        ESSENTIAL = "essential", "essential"
        PRODUCTIVE = "productive", "productive"
        LEISURE = "leisure", "leisure"

    name = models.CharField(max_length=100)
    category = models.CharField(
        max_length=max([len(x) for x in Category.values]),
        choices=Category.choices,
    )
    isDone = models.BooleanField(default=False)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ["user", "name", "date"]
        unique_together = ["user", "name", "date"]

    def __str__(self) -> str:
        return f"{self.date} {self.name}"
