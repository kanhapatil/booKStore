from django.contrib import admin
from .models import User, Contact, Addres


# Register user model
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "email", "contact", "is_staff"]
    readonly_fields = ["password", "is_superuser", "is_staff", "is_active", "date_joined", "last_login", "groups", "user_permissions"]
    list_per_page = 5
    

    ## Function to get a logIn user object 
    def get_queryset(self, request): 
        if (request.user.is_staff) and (not request.user.is_superuser): 
            return User.objects.filter(username=request.user.username) 
        else: 
            return User.objects.all() 
        
    def get_list_filter(self, request):
        if request.user.is_superuser:
            return ["username"]
        else:
            return []


# Register contact model
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ["email", "contact", "subject"]
    list_filter = ["email"]
    list_per_page = 5


# Register admin model
@admin.register(Addres)
class AddressAdmin(admin.ModelAdmin):
    list_display = ["user", "state", "city", "area"]
    list_per_page = 5

    ## Function to get a logIn user address object
    def get_queryset(self, request):
        if request.user.is_staff and not request.user.is_superuser:
            return Addres.objects.filter(user=request.user)
        else:
            return super().get_queryset(request)
        
    def get_list_filter(self, request):
        if request.user.is_superuser:
            return ["user", "state", "city"] 
        else:
            return []
        
    ## Function to display logIn user in user field
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if request.user.is_staff and not request.user.is_superuser:
            if db_field.name == "user":
                kwargs["initial"] = request.user.id
                kwargs["disabled"] = True 
                return super().formfield_for_foreignkey(db_field, request, **kwargs)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)