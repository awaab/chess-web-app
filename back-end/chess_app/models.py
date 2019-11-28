from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta
# Create your models here.

class Game(models.Model):
	winner_choices = [('W', 'White'),('B', 'Black'),('D', 'Draw'),]
	created_at = models.DateTimeField(auto_now_add=True)
	white_player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='game_as_white')
	black_player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='game_as_black')
	duration = models.TimeField(auto_now=False, auto_now_add=False)
	winner = models.CharField(
        max_length=2,
        choices=winner_choices,
        default='D',)
	def __str__(self):
		return self.white_player.username + 'vs' + self.black_player.username + 'winner:' +  self.winner
	def dictionary(self):
		return {
			'finished_at': self.created_at.strftime("%d/%m/%Y, %H:%M:%S"),
			'started_at': (self.created_at - timedelta(seconds=self.duration.second,minutes=self.duration.minute,hours=self.duration.hour)).strftime("%d/%m/%Y, %H:%M:%S"),
			'duration' : self.duration.strftime("%H:%M:%S"),
			'white_player': self.white_player.username,
			'black_player': self.black_player.username,
			'winner' :  self.winner,
		}