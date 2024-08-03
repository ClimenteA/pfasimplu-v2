import os
import peewee as pew
from settings import cfg
from .logger import log


db = pew.SqliteDatabase(cfg.DATABASE_URI)


class Base(pew.Model):
    
    class Meta:
        database = db 


def create_db_and_tables():
    from api.incasari.tables import IncasariTabel
    from api.fisiere.tables import FisiereTabel
    from api.setari.tables import PFATable

    if not os.path.exists(cfg.SAVE_PATH):
        os.makedirs(cfg.SAVE_PATH)
    
    if not os.path.exists(cfg.EXPORT_PATH):
        os.makedirs(cfg.EXPORT_PATH)
    
    db.connect()
    db.create_tables([IncasariTabel, FisiereTabel, PFATable])

    log.info("created db and tables")
