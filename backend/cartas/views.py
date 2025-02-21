from rest_framework import viewsets
from .models import Carta
from .serializers import CartaSerializer

class CartaViewSet(viewsets.ModelViewSet):
    queryset = Carta.objects.all()
    serializer_class = CartaSerializer
