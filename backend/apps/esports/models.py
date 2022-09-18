from django.db import models


class Game(models.Model):
    title = models.CharField(max_length=40)
    banner_url = models.CharField(max_length=250)

    def __str__(self):
        return f'{ self.title }'


class Ad(models.Model):
    created_at = models.DateField(auto_now_add=True)
    name = models.CharField(max_length=50)
    years_playing = models.PositiveSmallIntegerField(default=1)
    discord = models.CharField(max_length=50)
    week_days = models.CharField(max_length=13)
    hour_start = models.PositiveIntegerField(default=720, help_text='In minutes')
    hour_end = models.PositiveIntegerField(default=780, help_text='In minutes')
    use_voice_channel =  models.BooleanField(default=False)
    game = models.ForeignKey(Game, related_name='ads', on_delete=models.CASCADE)

    def __str__(self):
        return f'{ self.name } - { self.game }'