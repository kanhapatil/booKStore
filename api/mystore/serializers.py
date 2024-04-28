from .models import (Mystore, StoreItem, ReviewItem, ItemImage, 
                     ItemCategories, School)
from rest_framework import serializers
from django.db.models import Avg


## Serialize Mystore model
class MystoreSerialize(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    review_counts = serializers.SerializerMethodField()

    class Meta:
        model = Mystore
        fields = ["id", "user", "name", "contact", "verification", "city", "location", "date", "image1", "image2", "image3", "average_rating", "review_counts"]

    def get_average_rating(self, obj):
        # Calculate average rating for all store items
        total_ratings = 0 
        total_items = 0 
        for store_item in obj.storeItem.all(): # storeItem is a related_name in StoreItem table
            total_ratings += ReviewItem.objects.filter(item=store_item).aggregate(Avg('rating'))['rating__avg'] or 0
            total_items += 1
        
        # Calculate average rating for store if there are items and ratings 
        if total_items > 0: 
            return round(total_ratings / total_items, 1) 
        else: 
            return 0 
        
    def get_review_counts(self, obj):
        count = 0
        for store_item in obj.storeItem.all():
            count += ReviewItem.objects.filter(item=store_item).count()
        return count


## Serialize Categories model
class ItemCategoriesSerialize(serializers.ModelSerializer):
    class Meta:
        model = ItemCategories
        fields = ["id", "item", "category"]

## Serialize School model
class SchoolSerialize(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ["id", "item", "school_name"]

## Serialize ItemImage model
class ItemImageSerialize(serializers.ModelSerializer):
    class Meta:
        model = ItemImage
        fields = "__all__"


## Serialize ReviewItem
class ReviewItemSerialize(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True, default="bookstore")
    class Meta:
        model = ReviewItem
        fields = ["id", "username", "item", "rating", "description", "created_at"]


## Serialize StoreItem model
class StoreItemSerialize(serializers.ModelSerializer):
    item_review = ReviewItemSerialize(many=True, read_only=True)
    itemImages = ItemImageSerialize(many=True, read_only=True)
    itemCategory = ItemCategoriesSerialize(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    user_count = serializers.SerializerMethodField()
    class Meta:
        model = StoreItem
        fields = ["id", "store", "name", "standard", "price", 
                  "itemDesc", "itemImages", "item_review", "average_rating", 
                  "user_count", "itemCategory"]

    def get_average_rating(self, obj):
        average_rating = ReviewItem.objects.filter(item=obj).aggregate(Avg('rating'))['rating__avg']
        return round(average_rating, 1) if average_rating is not None else 0
    
    def get_user_count(self, obj):
        count = ReviewItem.objects.filter(item=obj).count()
        return count
    

## Serialize ItemOnly
class ItemOnlySerialize(serializers.ModelSerializer):
    itemImages = ItemImageSerialize(many=True, read_only=True)
    class Meta:
        model = StoreItem
        fields = ["id", "name", "standard", "price", "itemImages"]