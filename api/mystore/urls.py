from django.urls import path, include
from rest_framework.routers import DefaultRouter
from mystore import views


router = DefaultRouter()
router.register("mystore", views.Store, basename="mystore")
router.register("storerelateditem", views.StoreRelatedItem, basename="storerelateditem")
router.register("itemcategory", views.ItemCategory, basename="itemcategory")
router.register("schools", views.SchoolStore, basename="schools")
router.register("reviewitem", views.Review, basename="reviewitem")

urlpatterns = [
    path("", include(router.urls)),
    path("itemonly/", views.ItemOnly.as_view(), name="itemonly"),
    path("itemimage/", views.Images.as_view(), name="itemimage")
]