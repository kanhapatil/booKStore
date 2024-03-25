from django.db import models
from django.contrib.auth.models import AbstractUser


# Account model
class User(AbstractUser):
    email = models.CharField(max_length=255, unique=True)
    contact = models.CharField(max_length=15, unique=True)
    

# Contact model
QUERY_CHOICE = ( 
    ("Query", "Query"), 
    ("Open store", "Open store") 
) 
class Contact(models.Model):
    email = models.CharField(max_length=255)
    contact = models.CharField(max_length=15)
    subject = models.CharField(max_length=20, choices=QUERY_CHOICE)
    message = models.TextField()


# Address model            
class Addres(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    state = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    area = models.CharField(max_length=255, blank=True, null=True)
    zipcode = models.IntegerField(blank=True, null=True)
    houseNo = models.IntegerField(blank=True, null=True)