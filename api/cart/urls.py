
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cart import views


router = DefaultRouter()
router.register("mycart", views.MyCart, basename="mycart")
router.register("mycartitem", views.MyCartItem, basename="mycartitem")


urlpatterns = [
    path("", include(router.urls))
]
