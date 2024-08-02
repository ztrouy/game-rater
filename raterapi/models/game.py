from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

class Game(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    designer = models.CharField(max_length=255)
    year_released = models.IntegerField()
    number_of_players = models.IntegerField(validators=[MinValueValidator(1)])
    estimated_time_to_play = models.IntegerField(help_text="Time in minutes", validators=[MinValueValidator(1)])
    age_recommendation = models.IntegerField(validators=[MinValueValidator(0)])
    categories = models.ManyToManyField(
        "Category",
        through="GameCategory",
        related_name="books"
    )

    def __str__(self):
        return f"{self.title} by {self.designer}"