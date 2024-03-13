from django.shortcuts import render
from .models import Mystore, StoreItem, ReviewItem
from .serializers import MystoreSerialize, StoreItemSerialize, ReviewItemSerialize
from rest_framework import viewsets


# Mystore api class
class Store(viewsets.ModelViewSet):
    queryset = Mystore.objects.all()
    serializer_class = MystoreSerialize


# StoreItem api class
class Item(viewsets.ModelViewSet):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerialize


# ReviewItem api class
class Review(viewsets.ModelViewSet):
    queryset = ReviewItem.objects.all()
    serializer_class = ReviewItemSerialize