from django.db import models
from account.models import User, Addres
from django.core.validators import MinValueValidator, MaxValueValidator


# My store model
class Mystore(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    contact = models.CharField(max_length=15)
    date = models.DateField(auto_now_add=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    verification = models.BooleanField(default=False, blank=True, null=True)
    recharge = models.PositiveIntegerField(blank=True, null=True)
    image1 = models.ImageField(upload_to="storeImages/")
    image2 = models.ImageField(upload_to="storeImages/", blank=True, null=True)
    image3 = models.ImageField(upload_to="storeImages/", blank=True, null=True)

    def __str__(self):
        return self.name


## Store item model
class StoreItem(models.Model):
    store = models.ForeignKey(Mystore, on_delete=models.CASCADE, related_name="storeItem")
    name = models.CharField(max_length=100, blank=True, null=True)
    standard = models.CharField(max_length=255, blank=True, null=True)
    inStock = models.PositiveIntegerField(blank=True, null=True)
    price = models.IntegerField(validators=[MinValueValidator(1)], blank=True, null=True)
    itemDesc = models.TextField(blank=True, null=True)
    topay = models.PositiveIntegerField(blank=True, null=True) 
    open_to_sell = models.BooleanField(default=True, blank=True, null=True)
    start_date = models.DateField(auto_now_add=True, blank=True, null=True) 
    end_date = models.DateField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False)
    

    def __str__(self):
        return self.name
    

## Store item categories
class ItemCategories(models.Model):
    item = models.ForeignKey(StoreItem, on_delete=models.CASCADE, related_name="itemCategory")
    category = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.category

## School (Syllabus of school's)
class School(models.Model):
    store = models.ForeignKey(Mystore, on_delete=models.CASCADE, blank=True, null=True, related_name="storeSchool")
    school_name = models.CharField(max_length=255)
    city = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to="storeImages/", blank=True, null=True)


## Store item images
class ItemImage(models.Model):
    item = models.ForeignKey(StoreItem, on_delete=models.CASCADE, related_name="itemImages") 
    img = models.ImageField(upload_to="storeImages/") 

    def __str__(self):
        return f"Image for {self.item.name}"


# Review model
class ReviewItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name="user_review")
    item = models.ForeignKey(StoreItem, on_delete=models.SET_NULL, blank=True, null=True, related_name="item_review")
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    description = models.TextField()
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'item')
