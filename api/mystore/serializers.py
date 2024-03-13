from .models import Mystore, StoreItem, ReviewItem
from rest_framework import serializers


# Serialize Mystore model
class MystoreSerialize(serializers.ModelSerializer):
    class Meta:
        model = Mystore
        fields = ["id", "user", "name", "contact", "date", "image"]


# Serialize StoreItem model
class StoreItemSerialize(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = "__all__"


# Serialize ReviewItem
class ReviewItemSerialize(serializers.ModelSerializer):
    class Meta:
        model = ReviewItem
        fields = "__all__"