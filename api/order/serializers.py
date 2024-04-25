from rest_framework import serializers
from .models import Order, OrderItem


## Serialize OrderItem model
class OrderItemSerialize(serializers.ModelSerializer): 
    class Meta: 
        model = OrderItem 
        fields = ["id", "order", "item", "quantity"] 

        
## Serialize Order model
class OrderSerialize(serializers.ModelSerializer):
    orderItem = OrderItemSerialize(many=True, read_only=True)
    class Meta:
        model = Order 
        fields = ["id", "user", "store", "date", "orderItem"]