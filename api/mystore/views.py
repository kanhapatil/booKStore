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
from .filters import StoreItemFilter


## Mystore api class
class Store(viewsets.ModelViewSet):
    serializer_class = MystoreSerialize

    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['city', 'name']

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
class SchoolStore(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerialize

    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ["school_name", "city"]

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
    # filterset_fields = ('price', 'itemCategory__category')
    filterset_class = StoreItemFilter
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


# ## ReviewItem api class
# class Review(APIView):
#     def get(self, request, item_id):
#         item = StoreItem.objects.get(id=item_id)
#         review = ReviewItem.objects.filter(item=item)
#         serialize = ReviewItemSerialize(review, many=True)
#         return Response(serialize.data)
    

class Review(viewsets.ModelViewSet):
    serializer_class = ReviewItemSerialize

    def get_queryset(self):
        item_id = self.request.query_params.get('item_id')
        item = StoreItem.objects.get(id=item_id)
        return ReviewItem.objects.filter(item=item)
    
    