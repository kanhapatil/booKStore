from .models import Mystore, StoreItem, ReviewItem, ItemImage
from rest_framework import serializers
from django.db.models import Avg


# Serialize Mystore model
class MystoreSerialize(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    class Meta:
        model = Mystore
        fields = ["id", "user", "name", "contact", "status", "city", "location", "date", "image1", "image2", "image3", "average_rating"]

    def get_average_rating(self, obj):
        # Calculate average rating for all store items
        total_ratings = 0 
        total_items = 0 
        for store_item in obj.storeItem.all(): # storeItem is a related_name in StoreItem table
            total_ratings += ReviewItem.objects.filter(item=store_item).aggregate(Avg('rating'))['rating__avg'] or 0
            total_items += 1
        
        # Calculate average rating for store if there are items and ratings 
        if total_items > 0: 
            return round(total_ratings / total_items) 
        else: 
            return 0 


## Serialize ItemImage model
class ItemImageSerialize(serializers.ModelSerializer):
    class Meta:
        model = ItemImage
        fields = "__all__"


# Serialize StoreItem model
class StoreItemSerialize(serializers.ModelSerializer):
    itemImages = ItemImageSerialize(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    user_count = serializers.SerializerMethodField()
    class Meta:
        model = StoreItem
        fields = ["id", "store", "name", "type", "standard", "price", "itemDesc", "itemImages", "average_rating", "user_count"]

    def get_average_rating(self, obj):
        average_rating = ReviewItem.objects.filter(item=obj).aggregate(Avg('rating'))['rating__avg']
        return round(average_rating) if average_rating is not None else 0
    
    def get_user_count(self, obj):
        count = ReviewItem.objects.filter(item=obj).count()
        return count


# Serialize ReviewItem
class ReviewItemSerialize(serializers.ModelSerializer):
    class Meta:
        model = ReviewItem
        fields = "__all__"