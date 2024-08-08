from django.db import models
from django.db.models.functions import Now


class Setari(models.Model):
    nume = models.CharField(max_length=50)
    adresa = models.CharField(max_length=500)
    nr_reg_com = models.CharField(max_length=50)
    cif_vat_cui = models.CharField(max_length=20)
    telefon = models.CharField(max_length=50)
    email = models.EmailField()
    iban = models.CharField(max_length=34)
    caen_principal = models.CharField(max_length=4)
    caen_secondar_1 = models.CharField(max_length=4)
    caen_secondar_2 = models.CharField(max_length=4)
    caen_secondar_3 = models.CharField(max_length=4)
    caen_secondar_4 = models.CharField(max_length=4)
    caen_secondar_5 = models.CharField(max_length=4)
    actualizat_la = models.DateTimeField(db_default=Now())

    def __str__(self):
        return self.nume
