from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("", include("registre.urls")),
    path("cheltuieli/", include("cheltuieli.urls")),
    path("documente/", include("documente.urls")),
    path("incasari/", include("incasari.urls")),
    path("inventar/", include("inventar.urls")),
    path("registre/", include("registre.urls")),
    path("setari/", include("setari.urls")),
    path("admin/", admin.site.urls),
]
