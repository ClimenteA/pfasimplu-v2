import peewee as pew
from api.database import Base


class PFATable(Base):
    id = pew.PrimaryKeyField() 
    nume = pew.CharField()
    adresa = pew.CharField()
    nrRegCom = pew.CharField()
    cifVatCui = pew.CharField()
    telefon = pew.CharField()
    email = pew.CharField()
    iban = pew.CharField()
    caenPrincipal = pew.CharField()
    caenSecondar = pew.CharField()
    actualizat_la = pew.DateField()
