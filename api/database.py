# https://github.com/anthonycepeda/fastapi-sqlmodel
import os
from settings import cfg
from sqlmodel import SQLModel, create_engine
from .logger import log


connect_args = {"check_same_thread": False}
engine = create_engine(cfg.DATABASE_URI, echo=True, connect_args=connect_args)


def create_db_and_tables():
    if not os.path.exists(cfg.SAVE_PATH):
        os.makedirs(cfg.SAVE_PATH)

    SQLModel.metadata.create_all(engine)
    log.info("created db and tables")
