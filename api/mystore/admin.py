from collections.abc import Sequence
from typing import Any
from django.contrib import admin
from django.http import HttpRequest
from .models import Mystore, StoreItem, ReviewItem, ItemImage, ItemCategories, School
from django.utils.safestring import mark_safe
from django.contrib import messages
from datetime import datetime, timedelta


## Item image tab/inline field
class ItemImageInline(admin.TabularInline):
    model = ItemImage
    extra = 1


## Item category tab/inline field
class ItemCategoryInline(admin.TabularInline):
    model = ItemCategories
    extra = 1


## Item related to school tab/inline field
class StoreRelatedSchool(admin.TabularInline):
    model = School
    extra = 1


## Register Mystore model
@admin.register(Mystore)
class MystoreAdmin(admin.ModelAdmin):
    list_display = ["user", "name", "contact", "recharge", "verification"]
    exclude = ["recharge", "verification"]
    inlines = [StoreRelatedSchool]

    def get_readonly_fields(self, request, obj=None):
        if request.user.is_superuser: 
            return [] 
        return self.readonly_fields 
    
    def get_exclude(self, request: HttpRequest, obj: Any | None = ...) -> Any:
        if request.user.is_superuser:
            return [] 
        return self.exclude
    
    def get_list_filter(self, request):
        if request.user.is_superuser:
            return ["user", "name", "date", "verification"]
        else:
            return []
        
    ## Function to filter out logIn user store 
    def get_queryset(self, request): 
        if request.user.is_staff and not request.user.is_superuser: 
            return Mystore.objects.filter(user=request.user) 
        else: 
            return super().get_queryset(request) 
        
    ## Function to display logIn user in user field 
    def formfield_for_foreignkey(self, db_field, request, **kwargs): 
        if request.user.is_staff and not request.user.is_superuser: 
            if db_field.name == "user": 
                kwargs["initial"] = request.user.id 
                kwargs["disabled"] = True 
                return super().formfield_for_foreignkey(db_field, request, **kwargs) 
            return super().formfield_for_foreignkey(db_field, request, **kwargs)


## Register StoreItem
@admin.register(StoreItem)
class StoreItemAdmin(admin.ModelAdmin):
    list_display = ["store", "name", "price", "topay", "open_to_sell", "end_date"]
    inlines = [ItemImageInline, ItemCategoryInline]
    readonly_fields = []
    exclude = ["topay", "end_date"]
    list_per_page = 5

    ## Disable django default alert messages
    def message_user(self, request, message, level: int | str = ..., extra_tags: str = ..., fail_silently: bool = ...) -> None:
        return super().message_user(request, message, level, extra_tags, fail_silently)
    
    def get_list_display(self, request):
        if request.user.is_superuser:
            return self.list_display
        else:
            return ["name", "price", "topay", "open_to_sell", "end_date"]
    
    def get_list_filter(self, request):
        if request.user.is_superuser:
            return ["store", "name", "standard"]
        else:
            return ["name", "standard"]

    ## Write logic to deduct the store recharge while creating items
    def save_model(self, request, obj, form, change): 
        # Insert current date in start_date and calculate the end_date 30 days ahead of start_date 
        if not obj.start_date:
            obj.start_date = datetime.now().date() 
            obj.end_date = obj.start_date + timedelta(days=30) 
            obj.open_to_sell = True 
            
        # Calculate topay amount and insert in into topay field
        if obj.price is not None:
            obj.topay = int(obj.price * 0.05) 
        else: 
            obj.topay = None 

        if obj.topay is not None and obj.topay >= 0:
            my_store = Mystore.objects.get(id=obj.store.id) 
            
            if my_store.recharge - obj.topay >= 0: 
                my_store.recharge -= obj.topay 
                my_store.save() 
                messages.add_message(request, messages.SUCCESS, "Item added successfully!") 
            else: 
                # Add a message and redirect to the change form 
                messages.add_message(request, messages.ERROR, "Recharge your store!") 
                return  
        else: 
            # Add a message and redirect to the change form 
            messages.add_message(request, "Topay amount is negative. Item will not be saved.") 
            return 
                
        # call to the parent class save_model method
        super().save_model(request, obj, form, change)
    
    ## Function to freeze the field based on user type 
    def get_readonly_fields(self, request, obj=None): 
        curr_date = datetime.now().date() 
        try:  
            if StoreItem.objects.filter(id=obj.pk).exists(): 
                if request.user.is_staff and not request.user.is_superuser: 
                    if int(str(obj.end_date - curr_date).split(" ")[0]) > 1: 
                        return ("name", "itemDesc", "topay", "standard", "price", "start_date", "end_date", "open_to_sell") 
                    else: 
                        obj.open_to_sell = False 
                        obj.start_date = None 
                        return ("open_to_sell",)
                else: 
                    return () 
        except: 
            return () 

    ## Function to disable the default django buttons based on user type
    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        if object_id: 
            curr_date = datetime.now().date() 
            itemObj = StoreItem.objects.get(id=object_id) 
            if request.user.is_staff and not request.user.is_superuser and (int(str(itemObj.end_date - curr_date).split(" ")[0]) > 1):
                extra_context = extra_context or {} 
                extra_context['show_save'] = False 
                extra_context['show_save_and_continue'] = False
                extra_context['show_save_and_add_another'] = False
                return super().changeform_view(request, object_id, form_url, extra_context)
            else:
                return super().changeform_view(request, object_id, form_url, extra_context)
        else:
            return super().changeform_view(request, object_id, form_url, extra_context)

    ## Function to filter out logIn user store items
    def get_queryset(self, request):
        if request.user.is_superuser:
            return StoreItem.objects.all()
        else:
            my_store = Mystore.objects.get(user=request.user)
            return StoreItem.objects.filter(store=my_store)
    
    ## Function to display logIn user store name
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if request.user.is_staff and not request.user.is_superuser:
            if db_field.name == "store":
                my_store = Mystore.objects.get(user=request.user)
                kwargs["queryset"] = Mystore.objects.filter(pk=my_store.pk) 
        return super().formfield_for_foreignkey(db_field, request, **kwargs) 
    
    ## Function to disabled edit & add button
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if request.user.is_staff and not request.user.is_superuser:
            form.base_fields['store'].widget.can_add_related = False
            form.base_fields['store'].widget.can_change_related = False
        return form


## Register ItemCategories
@admin.register(ItemCategories)
class ItemCategoriesAdmin(admin.ModelAdmin):
    list_display = ["item", "category"]

    def get_queryset(self, request):
        if request.user.is_superuser:
            return ItemCategories.objects.all()
        else:
            my_store = Mystore.objects.get(user=request.user)
            my_store_items = StoreItem.objects.filter(store=my_store)
            return ItemCategories.objects.filter(item__in=my_store_items)


## Register School
@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ["school_name", "city", "address"]

    def get_queryset(self, request):
        if request.user.is_superuser:
            return School.objects.all()
        else:
            my_store = Mystore.objects.get(user=request.user)
            return School.objects.filter(store=my_store)


## Register ItemImage
# @admin.register(ItemImage) 
# class ItemImageAdmin(admin.ModelAdmin): 
#     list_display = ["id", "item", "img"] 
#     readonly_fields = ["img"] 
#     list_filter = ["item"]
#     readonly_fields = ["img_image"] 

#     def img_image(self, obj): 
#         return mark_safe('<img src="{url}" width="{width}" height="{height}" />'.format( 
#             url=obj.img.url, 
#             width=100, 
#             height=100, 
#         )) 
    
#     img_image.short_description = "Image"
    
#     ## Function to filter out ItemImages of current store item
#     def get_queryset(self, request):
#         if request.user.is_staff and not request.user.is_superuser:
#             my_store = Mystore.objects.get(user=request.user)
#             store_item = StoreItem.objects.filter(store=my_store)
#             return ItemImage.objects.filter(item__in=store_item)
#         else:
#             return super().get_queryset(request) 
        
#     ## Function to display only logIn user store items name
#     def formfield_for_foreignkey(self, db_field, request, **kwargs):
#         if request.user.is_staff and not request.user.is_superuser:
#             if db_field.name == "item":
#                 my_store = Mystore.objects.get(user=request.user)
#                 kwargs["queryset"] = StoreItem.objects.filter(store=my_store)
#         return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
#     ## Function to disabled edit & add button
#     def get_form(self, request, obj=None, **kwargs):
#         form = super().get_form(request, obj, **kwargs)
#         if request.user.is_staff and not request.user.is_superuser:
#             form.base_fields['item'].widget.can_add_related = False
#             form.base_fields['item'].widget.can_change_related = False
#         return form 


## Register ReviewItem 
@admin.register(ReviewItem) 
class ReviewItemAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "item", "rating"]
    list_per_page = 5

    ## Function to filter out logIn user store items review
    def get_queryset(self, request):
        if request.user.is_staff and not request.user.is_superuser: 
            my_store = Mystore.objects.get(user=request.user) 
            store_item = StoreItem.objects.filter(store=my_store) 
            return ReviewItem.objects.filter(item__in=store_item) 
        else:      
            return super().get_queryset(request)
        
    def get_list_filter(self, request):
        if request.user.is_superuser:
            return ["user", "item"]
        else:
            return ["item", "rating"]