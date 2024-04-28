from django.shortcuts import render
from .models import Mystore, StoreItem, ReviewItem, ItemImage, ItemCategories, School
from .serializers import (MystoreSerialize, StoreItemSerialize, 
                          ReviewItemSerialize, ItemImageSerialize, 
                          ItemOnlySerialize, ItemCategoriesSerialize, 
                          SchoolSerialize)
from account.models import Addres
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response


## Mystore api class
class Store(viewsets.ModelViewSet):
    serializer_class = MystoreSerialize

    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['city']

    def get_queryset(self):
        try:
            user_city = Addres.objects.filter(user=self.request.user)[0].city
            if user_city:
                return Mystore.objects.filter(city=user_city) 
            else:
                return Mystore.objects.all() 
        except:
            print("except", self.request.user)
            return Mystore.objects.all() 


## ItemCategories api class
class ItemCategory(viewsets.ModelViewSet):
    queryset = ItemCategories.objects.all()
    serializer_class = ItemCategoriesSerialize


## School api class
class SchoolItem(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerialize

## Item only api class
class ItemOnly(APIView):
    def get(self, request):
        item = StoreItem.objects.all()
        serialize = ItemOnlySerialize(item, many=True)
        return Response(serialize.data)


## ItemImage api class
class Images(APIView):
    def get(self, request):
        images = ItemImage.objects.all()
        serialize = ItemImageSerialize(images, many=True)
        return Response(serialize.data)


## StoreRelatedItem api class
class StoreRelatedItem(viewsets.ModelViewSet):
    serializer_class = StoreItemSerialize

    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ('price',)
    search_fields = ['name', 'price', 'standard']

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
class Review(APIView):
    def get(self, request):
        review = ReviewItem.objects.all()
        serialize = ReviewItemSerialize(review, many=True)
        return Response(serialize.data)