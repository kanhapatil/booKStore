from django.db import models
from account.models import User
from mystore.models import Mystore, StoreItem
from cart.models import Cart


## Order model
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    store = models.ForeignKey(Mystore, on_delete=models.CASCADE, blank=True, null=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, blank=True, null=True)
    status = models.BooleanField(default=False, blank=True, null=True)
    date = models.DateField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return f"Order of {self.user.username} at {self.store}"
    

## OrderItem model 
class OrderItem(models.Model): 
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="orderItem") 
    item = models.ForeignKey(StoreItem, on_delete=models.CASCADE, blank=True, null=True)  
    quantity = models.PositiveIntegerField(blank=True, null=True) 