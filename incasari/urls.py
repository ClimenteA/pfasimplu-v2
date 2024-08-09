from django.urls import path
from .views import IncasariView


urlpatterns = [
    path("", IncasariView.as_view(), name="incasari"),
]
