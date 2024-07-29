from datetime import datetime
from sqlmodel import Field, SQLModel


class Incasari(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    serie: str = Field(default="")
    numar: str = Field(default="")
    suma_incasata: float = Field(default=0.0)
    nume_fisier: str = Field(default="")   
    adaugat_la: str = Field(default_factory=lambda: datetime.now().isoformat())
