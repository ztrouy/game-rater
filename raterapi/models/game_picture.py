from django.db import models
from django.contrib.auth.models import User
from .game import Game

class GamePicture(models.Model):
    game = models.ForeignKey(Game, on_delete=models.DO_NOTHING, related_name="pictures")
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="pictures")
    image = models.ImageField(upload_to='actionimages', height_field=None, 
                              width_field=None, max_length=None, null=True)

    def __str__(self):
        return f"Picture by {self.user.username} for {self.game.title}"