from .models import Order, OrderItem
from .serializers import OrderSerialize, OrderItemSerialize
from rest_framework import viewsets
from mystore.models import Mystore
from cart.models import Cart, CartItem
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


## Order api class 
class Myorder(viewsets.ModelViewSet): 
    serializer_class = OrderSerialize 

    permission_classes = [IsAuthenticated]

    def get_queryset(self): 
        user_id = self.request.user.id 
        if user_id:
            return Order.objects.filter(user__id=user_id)
        else:
            return Order.objects.all()

    def create(self, request):
        store = Mystore.objects.get(id=request.data.get("store"))
        
        # Create an order of user
        order = Order.objects.create(user=request.user, store=store)

        user_cart = Cart.objects.get(id=request.data.get("cart"))
        user_cart_items = CartItem.objects.filter(cart=user_cart)
       
       # Insert CartItems in the OrderItem 
        for i in user_cart_items:
            OrderItem.objects.create(order=order, item=i.item, quantity=i.quantity)

        # Delete the user cart 
        user_cart.delete()

        return Response({"msg": "Order places"}, status=status.HTTP_201_CREATED)


## OrderItem api class 
class MyOrderItem(viewsets.ModelViewSet): 
    queryset = OrderItem.objects.all() 
    serializer_class = OrderItemSerialize 