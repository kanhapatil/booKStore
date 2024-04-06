from typing import Collection
from django.db import models
from mystore.models import Mystore, StoreItem
from account.models import User
from django.core.validators import MinValueValidator


## Cart model 
class Cart(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    store = models.ForeignKey(Mystore, on_delete=models.CASCADE, related_name="cart_store") 
    
    class Meta:  
        unique_together = ("user", "store") 
        
    def __str__(self):
        return f"Cart for {self.user.username} at {self.store.name}"

## Cart Item model
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="cart") 
    item = models.ForeignKey(StoreItem, on_delete=models.CASCADE, related_name="cartItem") 
    quantity = models.IntegerField(validators=[MinValueValidator(1)], default=1) 