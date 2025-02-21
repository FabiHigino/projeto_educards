from django.contrib import admin
from .models import Carta

class CartaAdmin(admin.ModelAdmin):
  list_display = ('titulo', 'categoria', 'imagem', 'modelo_3d')
  search_fields = ('titulo', 'categoria')

admin.site.register(Carta, CartaAdmin)
