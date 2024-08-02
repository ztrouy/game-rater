from django.db import models
from django.contrib.auth.models import User
from .game import Game

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return f"Review by {self.user.username} on {self.game.title}"