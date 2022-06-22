from django.db import models

class ShortenUrl(models.Model):
  shorten = models.CharField(max_length=50, primary_key=True)
  originLink = models.CharField(max_length=9999)

