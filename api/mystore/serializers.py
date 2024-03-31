from .models import Mystore, StoreItem, ReviewItem, ItemImage
from rest_framework import serializers


# Serialize Mystore model
class MystoreSerialize(serializers.ModelSerializer):
    class Meta:
        model = Mystore
        fields = ["id", "user", "name", "contact", "status", "city", "location", "date", "image1", "image2", "image3"]


## Serialize ItemImage model
class ItemImageSerialize(serializers.ModelSerializer):
    class Meta:
        model = ItemImage
        fields = "__all__"


# Serialize StoreItem model
class StoreItemSerialize(serializers.ModelSerializer):
    itemImages = ItemImageSerialize(many=True, read_only=True)
    class Meta:
        model = StoreItem
        fields = ["id", "store", "name", "type", "standard", "price", "itemDesc", "itemImages"]


# Serialize ReviewItem
class ReviewItemSerialize(serializers.ModelSerializer):
    class Meta:
        model = ReviewItem
        fields = "__all__"