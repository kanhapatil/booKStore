from django.contrib import admin
from .models import Mystore, StoreItem, ReviewItem, ItemImage


# Register Mystore model
@admin.register(Mystore)
class MystoreAdmin(admin.ModelAdmin):
    list_display = ["user", "name", "contact", "date"]


# Register StoreItem
@admin.register(StoreItem)
class StoreItemAdmin(admin.ModelAdmin):
    list_display = ["id", "store", "name", "standard"]


## Register ItemImage
@admin.register(ItemImage)
class ItemImageAdmin(admin.ModelAdmin):
    list_display = ["id", "item", "img"]


# Register ReviewItem
@admin.register(ReviewItem)
class ReviewItemAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "item"]