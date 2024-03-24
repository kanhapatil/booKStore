from django.urls import path, include
from rest_framework.routers import DefaultRouter
from account import views

router = DefaultRouter()
router.register("register", views.Register, basename="register")
router.register("contact", views.Contact, basename="contact")
router.register("address", views.Address, basename="address")


urlpatterns = [
    path("", include(router.urls)),
    path("login/", views.Loginview.as_view(), name="login")
]