from django.db import models
from django.contrib.auth.models import User
from .game import Game
from django.core.validators import MinValueValidator, MaxValueValidator

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])

    def __str__(self):
        return f"{self.game.title} - {self.rating}"