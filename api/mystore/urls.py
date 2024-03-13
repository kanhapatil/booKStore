from django.urls import path, include
from rest_framework.routers import DefaultRouter
from mystore import views


router = DefaultRouter()
router.register("mystore", views.Store, basename="mystore")
router.register("storeitem", views.Item, basename="storeitem")
router.register("reviewitem", views.Review, basename="reviewitem")

urlpatterns = [
    path("", include(router.urls))
]