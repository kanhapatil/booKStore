from django.shortcuts import render, redirect
from .models import User, Contact, Addres
from .serializers import UserSerializer, ContactSerializer, AddressSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout
from account.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from account.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import Group
from rest_framework import status
from mystore.models import Mystore


# Register api class
class Register(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(username=self.request.user)

    def perform_create(self, serializer):
        user_instance = serializer.save()
        Addres.objects.create(user=user_instance)


# Login api class
class Loginview(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
        
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise AuthenticationFailed("Account does not exist")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")

        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)
        
        return Response({
            "access_token": str(access_token),
            "refresh_token": str(refresh_token)
        })


# Contact api class
class Contact(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request):
        subject = request.data.get("subject")
        username = request.data.get("email")
        
        if subject == "Open store":
            group = Group.objects.get(name="staff")
            user_instance = User.objects.get(username=username)
            user_instance.is_staff = True
            user_instance.save()
            user_instance.groups.add(group)

            # Create instance of store for this user
            Mystore.objects.create(user=user_instance)
        
        # Call the superclass method to continue with regular object creation
        return super().create(request)
    

# Address api class
class Address(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AddressSerializer 

    def get_queryset(self):
        return Addres.objects.filter(user=self.request.user)


## Admin logout function
def logout_view(request):
  logout(request)
  response = redirect('/admin/login/?next=/admin/account/user/')
  response.delete_cookie('example_cookie')
  return response