import peewee as pew
from api.database import db


class FisiereTabel(pew.Model):
    id = pew.PrimaryKeyField()
    cale_fisier = pew.CharField()
    adaugat_la = pew.DateField()

    class Meta:
        database = db 
