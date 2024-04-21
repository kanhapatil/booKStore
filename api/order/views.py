from .models import Order, OrderItem
from .serializers import OrderSerialize, OrderItemSerialize
from rest_framework import viewsets


## Order api class 
class Myorder(viewsets.ModelViewSet): 
    queryset = Order.objects.all() 
    serializer_class = OrderSerialize 

    def get_queryset(self):
        user_id = self.request.query_params.get("user_id")
        if user_id:
            return Order.objects.filter(user__id=user_id)
        else:
            return Order.objects.all()


## OrderItem api class 
class MyOrderItem(viewsets.ModelViewSet): 
    queryset = OrderItem.objects.all() 
    serializer_class = OrderItemSerialize 