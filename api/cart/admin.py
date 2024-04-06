from django.contrib import admin
from .models import Cart, CartItem


## Register Cart model
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "store"]


## Register CartItem model
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ["id", "cart", "item", "quantity"]