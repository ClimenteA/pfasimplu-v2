from settings import cfg
from sqlmodel import Session, SQLModel, create_engine


connect_args = {"check_same_thread": False}
engine = create_engine(cfg.DATABASE_URI, echo=True, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session