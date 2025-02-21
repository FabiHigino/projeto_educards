from django.db import models
from django.core.exceptions import ValidationError
import os

class Carta(models.Model):
    CATEGORIAS = (
        ('astronomia', 'Astronomia'),
        ('ciencias', 'Ciências'),
        ('biologia', 'Biologia'),
        ('outro', 'Outro'),
    )

    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    categoria = models.CharField(max_length=20, choices=CATEGORIAS, default='Outro')
    imagem = models.ImageField(upload_to="cartas/")
    modelo_3d = models.FileField(upload_to="modelos_3d/") 
    mind_target = models.FileField(upload_to="mind_targets/", null=True, blank=True)