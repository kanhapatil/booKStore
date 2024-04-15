from .models import Cart, CartItem
from .serializers import CartSerialize, CartItemSerialize
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import AnonymousUser



## Cart api class
class MyCart(viewsets.ModelViewSet):
    serializer_class = CartSerialize
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return Cart.objects.filter(user=user_id)

    def create(self, request):
        user = request.user
        store_id = request.data.get("store")

        try:
            existing_cart = Cart.objects.get(user=user, store=store_id) 
            return Response({"cart_id": existing_cart.id}, status=status.HTTP_200_OK) 
        
        except Cart.DoesNotExist: 
            # If the cart doesn't exist, create a new one
            request.data['user'] = user.id  # Set user_id to the logged-in user's ID
            serializer = self.get_serializer(data=request.data) 
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


## CartItem api class                    
class MyCartItem(viewsets.ModelViewSet):   
    queryset = CartItem.objects.all()      
    serializer_class = CartItemSerialize 

    # permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        try:
            user = self.request.user
            if not isinstance(user, AnonymousUser):
                user_cart = Cart.objects.filter(user=user)
                return CartItem.objects.filter(cart__in=user_cart)
            else:
                return CartItem.objects.none()
            
        except ObjectDoesNotExist:
            return CartItem.objects.none()
    
    def create(self, request): 
        cart_id = request.data.get("cart") 
        item_id = request.data.get("item") 
        quantity = request.data.get("quantity") 
        
        try: 
            existing_item = CartItem.objects.get(cart=cart_id, item=item_id) 
            existing_item.quantity = quantity 
            existing_item.save() 
            return Response({"msg": "Item quantity increased"}, status=status.HTTP_200_OK) 
        
        except CartItem.DoesNotExist: 
            serializer = self.get_serializer(data=request.data) 
            serializer.is_valid(raise_exception=True) 
            serializer.save() 
            return Response({"msg": "Item added to cart"}, status=status.HTTP_201_CREATED) 