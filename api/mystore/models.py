from django.db import models
from account.models import User, Addres
from django.core.validators import MinValueValidator, MaxValueValidator


# My store model
class Mystore(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    contact = models.CharField(max_length=15)
    date = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    verification = models.BooleanField(default=False, blank=True, null=True)
    image = models.ImageField(upload_to="storeImages/")

    def __str__(self):
        return self.name


# Store item model
class StoreItem(models.Model):
    store = models.ForeignKey(Mystore, on_delete=models.CASCADE)


# Review model
class ReviewItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(StoreItem, on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    description = models.TextField()
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'item')
