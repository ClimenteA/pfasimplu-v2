from datetime import datetime
from pydantic import computed_field
from sqlmodel import Field, SQLModel
from settings import cfg
from enum import StrEnum

class TipTranzactie(StrEnum):
    BANCAR = "BANCAR"
    NUMERAR = "NUMERAR"

class SursaVenit(StrEnum):
    ACTIVITATE_PRINCIPALA = "Venit din activitati independente"
    ALTE_SURSE = "Venit din alte surse"
    INCHIRIERI = "Venit din cedarea folosintei bunurilor"
    CASTIG_INVESTITII = "Venit si/sau castig din investitii"
    DREPTURI_PROP_INTELECTUALA = "Venit din drepturi de proprietate intelectuala"
    AGRICULTURA = "Venit din activitati agricole, silvicultura si piscicultura"
    DIVIDENTE_VENIT_DISTRUBUIT = "Venit distribuit din asociere cu persoane juridice, contribuabili potrivit prevederilor titlului II, titlului III sau Legii nr.170/2016"



class Incasari(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    serie_factura: str = Field(default="INV")
    numar_factura: int = Field(default=0)
    suma_incasata: float = Field(default=0.0)
    tip_tranzactie: TipTranzactie = Field(default=TipTranzactie.BANCAR)
    sursa_venit: SursaVenit = Field(default=SursaVenit.ACTIVITATE_PRINCIPALA)
    nume_fisier: str = Field(default="")
    data_incasare: str = Field(default="")
    data_emitere_factura: str = Field(default="")
    adaugat_la: str = Field(default_factory=lambda: datetime.now().isoformat())

    @computed_field
    @property
    def url_fisier(self) -> str:
        return f"{'https' if cfg.SECURE_URL else 'http'}://{cfg.HOST}:{cfg.PORT}/v1/fisiere/{self.nume_fisier}"
