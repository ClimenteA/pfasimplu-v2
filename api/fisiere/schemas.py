from datetime import datetime
from pydantic import BaseModel, Field


class FisiereSchema(BaseModel):
    cale_fisier: str
    adaugat_la: str = Field(default_factory=lambda: datetime.now().isoformat())


class FisierUploadedSchema(BaseModel):
    fisier_id: int
    nume_fisier: str
    url_fisier: str
