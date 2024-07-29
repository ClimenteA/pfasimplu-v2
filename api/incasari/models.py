from datetime import datetime
from pydantic import computed_field
from sqlmodel import Field, SQLModel
from settings import cfg


class Incasari(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    serie: str = Field(default="")
    numar: str = Field(default="")
    suma_incasata: float = Field(default=0.0)
    nume_fisier: str = Field(default="")
    adaugat_la: str = Field(default_factory=lambda: datetime.now().isoformat())

    @computed_field
    @property
    def url_fisier(self) -> str:
        return f"{'https' if cfg.SECURE_URL else 'http'}://{cfg.HOST}:{cfg.PORT}/v1/fisiere/{self.nume_fisier}"
