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


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        csrf_token = csrf.get_token(request)
        return Response({'csrfToken': csrf_token})


# Account api class
@method_decorator(ensure_csrf_cookie, name='dispatch')
class Account(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [AllowAny]

    # Hash the password before saving
    def perform_create(self, serializer):
        serializer.save(password=make_password(self.request.data['password']))


# Contact api class
class Contact(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


# Address api class
class Address(viewsets.ModelViewSet):
    queryset = Addres.objects.all()
    serializer_class = AddressSerializer 


@method_decorator(csrf_protect, name='dispatch') 
class LoginView(APIView): 
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
     
        if user is not None:
            if user.is_active:
                login(request, user)
                return Response({'detail':'Logged in successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Username or Password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
    

class UserDetail(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(email=self.request.user)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'detail': 'Logged out successfully.'}, status=status.HTTP_200_OK)