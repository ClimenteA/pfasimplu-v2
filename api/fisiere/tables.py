import peewee as pew
from api.database import Base


class FisiereTabel(Base):
    id = pew.PrimaryKeyField()
    cale_fisier = pew.CharField()
    adaugat_la = pew.DateField()
