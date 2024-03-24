from django.shortcuts import render
from .models import User, Contact, Addres
from .serializers import UserSerializer, ContactSerializer, AddressSerializer
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from account.models import User
from django.contrib.auth.tokens import default_token_generator
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from account.serializers import UserSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import viewsets
from django.middleware import csrf
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed


# Register api class
class Register(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

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


# Address api class
class Address(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AddressSerializer 

    def get_queryset(self):
        return Addres.objects.filter(user=self.request.user)
