from django.shortcuts import render
from .models import Mystore, StoreItem, ReviewItem, ItemImage
from .serializers import MystoreSerialize, StoreItemSerialize, ReviewItemSerialize, ItemImageSerialize
from rest_framework import viewsets
from account.models import Addres
from django_filters import rest_framework as filters


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


## ItemImage api class
class Images(viewsets.ModelViewSet):
    queryset = ItemImage.objects.all()
    serializer_class = ItemImageSerialize


## StoreRelatedItem api class
class StoreRelatedItem(viewsets.ModelViewSet):
    serializer_class = StoreItemSerialize

    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('name', 'type', 'standard', 'price')
    
    def get_queryset(self):
        store_id = self.request.query_params.get('store_id')
        if store_id:
            try:
                store = Mystore.objects.get(id=store_id)
                return StoreItem.objects.filter(store=store)
            except Mystore.DoesNotExist:
                return StoreItem.objects.none
        else:
            return StoreItem.objects.all()


# ReviewItem api class
class Review(viewsets.ModelViewSet):
    queryset = ReviewItem.objects.all()
    serializer_class = ReviewItemSerialize