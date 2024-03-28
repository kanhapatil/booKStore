from django.shortcuts import render
from .models import Mystore, StoreItem, ReviewItem
from .serializers import MystoreSerialize, StoreItemSerialize, ReviewItemSerialize
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from account.models import Addres


# Mystore api class
class Store(viewsets.ModelViewSet):
    serializer_class = MystoreSerialize

    def get_queryset(self):
        try:
            print("try", self.request.user)
            user_city = Addres.objects.filter(user=self.request.user)[0].city
            if user_city:
                return Mystore.objects.filter(city=user_city) 
            else:
                return Mystore.objects.all() 
        except:
            print("except", self.request.user)
            return Mystore.objects.all() 


# StoreItem api class
class Item(viewsets.ModelViewSet):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerialize


# ReviewItem api class
class Review(viewsets.ModelViewSet):
    queryset = ReviewItem.objects.all()
    serializer_class = ReviewItemSerialize