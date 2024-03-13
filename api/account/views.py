from django.shortcuts import render
from .models import User, Contact, Addres
from .serializers import UserSerializer, ContactSerializer, AddressSerializer
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt


# Account api class
class Account(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # authentication_classes = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]


# Contact api class
class Contact(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


# Address api class
class Address(viewsets.ModelViewSet):
    queryset = Addres.objects.all()
    serializer_class = AddressSerializer 

    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]