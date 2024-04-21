from django.urls import path, include
from rest_framework.routers import DefaultRouter
from order import views


router = DefaultRouter()
router.register("myorder", views.Myorder, basename="order")
router.register("myorderitem", views.MyOrderItem, basename="orderitem")

urlpatterns = [
    path("", include(router.urls))
]