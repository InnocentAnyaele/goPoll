from pyexpat import model
# from tkinter import CASCADE
from django.db import models
from django.db.models.deletion import CASCADE

# Create your models here.

class Poll(models.Model):
    # pollID
    userMail = models.CharField(max_length=60)
    pollName = models.CharField(max_length=30)
    pollBody = models.CharField(max_length = 120)
    pollCreatedAt = models.DateTimeField(auto_now=True)
    anonymous = models.BooleanField()
    pollCloseAt = models.DateTimeField()
    pollLink = models.CharField(max_length = 60)
    
class Options(models.Model):
    # optionID
    pollID = models.ForeignKey(Poll, on_delete= models.CASCADE)
    optionName = models.CharField(max_length=60)
    votes = models.IntegerField(default=0)
    
class Votes(models.Model):
    # voteID
    optionID = models.ForeignKey(Options, on_delete=models.CASCADE, related_name='Votes')
    pollID = models.ForeignKey(Poll, on_delete=models.CASCADE)
    voterMail = models.CharField(max_length = 60)
    
    
