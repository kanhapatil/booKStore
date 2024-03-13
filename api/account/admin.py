from django.contrib import admin
from .models import User, Contact, Addres


# Register user model
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "email", "contact", "is_staff"]


# Register contact model
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ["email", "contact", "subject"]


# Register admin model
@admin.register(Addres)
class AddressAdmin(admin.ModelAdmin):
    list_display = ["user", "state", "city", "area"]