import peewee as pew
from api.database import db


class IncasariTabel(pew.Model):
    id = pew.PrimaryKeyField()
    suma_incasata = pew.FloatField()
    moneda = pew.CharField()
    curs_bnr = pew.FloatField()
    tip_tranzactie = pew.CharField()
    sursa_venit = pew.CharField()
    nume_fisier = pew.CharField()
    data_incasare = pew.CharField()
    modificat_la = pew.CharField()

    class Meta:
        database = db 
