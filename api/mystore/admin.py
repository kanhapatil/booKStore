from django.contrib import admin
from .models import Mystore, StoreItem, ReviewItem


# Register Mystore model
@admin.register(Mystore)
class MystoreAdmin(admin.ModelAdmin):
    list_display = ["user", "name", "contact", "date"]


# Register StoreItem
@admin.register(StoreItem)
class StoreItemAdmin(admin.ModelAdmin):
    list_display = ["id", "store"]


# Register ReviewItem
@admin.register(ReviewItem)
class ReviewItemAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "item"]