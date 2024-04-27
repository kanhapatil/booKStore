from django.urls import path, include
from rest_framework.routers import DefaultRouter
from mystore import views


router = DefaultRouter()
router.register("mystore", views.Store, basename="mystore")
router.register("storerelateditem", views.StoreRelatedItem, basename="storerelateditem")


urlpatterns = [
    path("", include(router.urls)),
    path("itemonly/", views.ItemOnly.as_view(), name="itemonly"),
    path("reviewitem/", views.Review.as_view(), name="reviewitem"),
    path("itemimage/", views.Images.as_view(), name="itemimage")
]