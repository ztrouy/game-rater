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

    @property
    def average_rating(self):
        """Average rating calculated attribute for each game"""
        ratings = self.ratings.all()

        total_rating = 0
        for rating in ratings:
            total_rating += rating.rating

        average_rating = round((total_rating / len(ratings)), 1)

        return average_rating

    def __str__(self):
        return f"{self.title} by {self.designer}"