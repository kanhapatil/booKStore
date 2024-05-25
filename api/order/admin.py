from typing import Any
from django.contrib import admin
from django.db.models.query import QuerySet
from django.http import HttpRequest
from .models import Order, OrderItem
from mystore.models import Mystore


## Register Order model
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "store", "date"]

    def get_queryset(self, request):
        if request.user.is_superuser:
            return Order.objects.all()
        else:
            my_store = Mystore.objects.get(user=request.user)
            return Order.objects.filter(store=my_store) 


## Register OrderItem model
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["id", "order", "item", "quantity"] 

    def get_queryset(self, request):
        if request.user.is_superuser:
            return OrderItem.objects.all()
        else:
            my_store = Mystore.objects.get(user=request.user)    
            my_store_order = Order.objects.filter(store=my_store) 
            return OrderItem.objects.filter(order__in=my_store_order)