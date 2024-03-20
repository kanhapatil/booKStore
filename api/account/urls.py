from django.urls import path, include
from rest_framework.routers import DefaultRouter
from account import views

router = DefaultRouter()
router.register("account", views.Account, basename="account")
router.register("contact", views.Contact, basename="contact")
router.register("address", views.Address, basename="address")


urlpatterns = [
    path("", include(router.urls)),
    path("get_csrf/", views.GetCSRFToken.as_view(), name="get_csrf"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout")
]