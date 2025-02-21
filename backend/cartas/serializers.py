from rest_framework import serializers
from .models import Carta

class CartaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carta
        fields = '__all__'
