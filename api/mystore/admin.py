from django.contrib import admin
from .models import Mystore, StoreItem, ReviewItem, ItemImage, ItemCategories, School
from django.utils.safestring import mark_safe


## Item image tab/inline field
class ItemImageInline(admin.TabularInline):
    model = ItemImage
    extra = 1

## Item category tab/inline field
class ItemCategoryInline(admin.TabularInline):
    model = ItemCategories
    extra = 1

## Item related to school tab/inline field
class ItemRelatedSchool(admin.TabularInline):
    model = School
    extra = 1


## Register Mystore model
@admin.register(Mystore)
class MystoreAdmin(admin.ModelAdmin):
    list_display = ["user", "name", "contact", "date"]
    readonly_fields = ["verification", "recharge", "url_image", "url"] 

    ## Function to display url image 
    def url_image(self, obj): 
        return mark_safe('<img src="{url}" width="{width}" height="{height}" />'.format( 
            url=obj.url.url, 
            width=150, 
            height=150, 
        )) 

    def get_readonly_fields(self, request, obj=None):
        if request.user.is_superuser: 
            return [] 
        return self.readonly_fields 
    
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
    list_display = ["id", "store", "name", "standard"]
    inlines = [ItemImageInline, ItemCategoryInline, ItemRelatedSchool]
    # search_fields = ["name"]

    def get_queryset(self, request):
        if request.user.is_superuser:
            return StoreItem.objects.all()
        else:
            my_store = Mystore.objects.get(user=request.user)
            return StoreItem.objects.filter(store=my_store)


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
    list_display = ["item", "school_name"]


## Register ItemImage
@admin.register(ItemImage) 
class ItemImageAdmin(admin.ModelAdmin): 
    list_display = ["id", "item", "img"] 
    readonly_fields = ["img"] 
    list_filter = ["item"]
    readonly_fields = ["img_image"] 

    def img_image(self, obj): 
        return mark_safe('<img src="{url}" width="{width}" height="{height}" />'.format( 
            url=obj.img.url, 
            width=100, 
            height=100, 
        )) 
    
    img_image.short_description = "Image"
    
    ## Function to filter out ItemImages of current store item
    def get_queryset(self, request):
        if request.user.is_staff and not request.user.is_superuser:
            my_store = Mystore.objects.get(user=request.user)
            store_item = StoreItem.objects.filter(store=my_store)
            return ItemImage.objects.filter(item__in=store_item)
        else:
            return super().get_queryset(request) 
        
    ## Function to display only logIn user store items name
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if request.user.is_staff and not request.user.is_superuser:
            if db_field.name == "item":
                my_store = Mystore.objects.get(user=request.user)
                kwargs["queryset"] = StoreItem.objects.filter(store=my_store)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    ## Function to disabled edit & add button
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if request.user.is_staff and not request.user.is_superuser:
            form.base_fields['item'].widget.can_add_related = False
            form.base_fields['item'].widget.can_change_related = False
        return form 


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