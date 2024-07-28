from datetime import datetime
from sqlmodel import Field, SQLModel


class DatePFA(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nume: str = Field(min_length=5)
    adresa: str = Field(min_length=5)
    nrRegCom: str = Field(min_length=5)
    cifVatCui: str = Field(min_length=5)
    telefon: str = Field(min_length=5)
    email: str = Field(min_length=5)
    iban: str = Field(min_length=30)
    caenPrincipal: str = Field(min_length=2)
    caenSecondar: str = Field(default="")
    actualizat_la: str = Field(default_factory=lambda: datetime.now().isoformat())
