from datetime import datetime
from pydantic import BaseModel, Field
from enum import StrEnum


class FisiereSchema(BaseModel):
    cale_fisier: str
    adaugat_la: str = Field(default_factory=lambda: datetime.now().isoformat())


class FisierUploadedSchema(BaseModel):
    fisier_id: int
    nume_fisier: str
    url_fisier: str


class TipDescarcare(StrEnum):
    CSV = "CSV"
    XLSX = "XLSX"


class DBTableNames(StrEnum):
    incasaritabel = "incasaritabel"
    pfatable = "pfatable"
