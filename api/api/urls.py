from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from django.conf.urls.static import static
from django.conf import settings
from account import views
from django.shortcuts import redirect

urlpatterns = [
    path('logout/', views.logout_view, name='logout'),
    path('admin/logout/', lambda request: redirect('/logout/', permanent=False)),
    path('admin/', admin.site.urls),
    path("user/", include("account.urls")),
    path("store/", include("mystore.urls")),
    path("cart/", include("cart.urls")),

    path('token/', jwt_views.TokenObtainPairView.as_view(), name ="token_obtain_pair"),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)