from rest_framework import serializers
from .models import User, Contact, Addres

# Serialize user model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "contact", "password"]


# Serialize contact model
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"


# Serialize address model
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addres
        fields = ["id", "user", "state", "city", "area", "zipcode", "houseNo"]


