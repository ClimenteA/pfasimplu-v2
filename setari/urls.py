from django.urls import path

from .views import SetariView


urlpatterns = [
    path("", SetariView.as_view(), name="setari"),
]
