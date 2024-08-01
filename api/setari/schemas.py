from datetime import datetime
from enum import StrEnum
from pydantic import BaseModel, Field


class VarBA(StrEnum):
    PLAFON_TVA = "PLAFON_TVA"
    PRAG_MIJLOC_FIX = "PRAG_MIJLOC_FIX"
    SALARIUL_MINIM_BRUT = "SALARIUL_MINIM_BRUT"


class VarBDC(BaseModel):
    an: int
    valoare: float
    tip: VarBA


bdc = [
    VarBDC(an=2022, valoare=2500, tip=VarBA.PRAG_MIJLOC_FIX),
    VarBDC(an=2022, valoare=300000, tip=VarBA.PLAFON_TVA),
    VarBDC(an=2020, valoare=2230, tip=VarBA.SALARIUL_MINIM_BRUT),
    VarBDC(an=2021, valoare=2300, tip=VarBA.SALARIUL_MINIM_BRUT),
    VarBDC(an=2022, valoare=2550, tip=VarBA.SALARIUL_MINIM_BRUT),
    VarBDC(an=2024, valoare=3300, tip=VarBA.SALARIUL_MINIM_BRUT),
]


class PFASchema(BaseModel):
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
