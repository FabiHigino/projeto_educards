from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartaViewSet

router = DefaultRouter()
router.register(r'cartas', CartaViewSet)

urlpatterns = [
  path("", include(router.urls)),
]
