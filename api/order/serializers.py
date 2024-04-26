from rest_framework import serializers
from .models import Order, OrderItem
from mystore.serializers import ItemOnlySerialize


## Serialize OrderItem model
class OrderItemSerialize(serializers.ModelSerializer): 
    item = ItemOnlySerialize()
    class Meta: 
        model = OrderItem 
        fields = ["id", "order", "item", "quantity", "item"] 

        
## Serialize Order model
class OrderSerialize(serializers.ModelSerializer):
    orderItem = OrderItemSerialize(many=True, read_only=True)
    class Meta:
        model = Order 
        fields = ["id", "user", "store", "date", "orderItem"]