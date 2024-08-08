from django.urls import path

from . import views

urlpatterns = [
    path("", views.VSetari.as_view(), name="setari"),
]
