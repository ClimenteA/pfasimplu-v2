import os
from api.logger import log
from fastapi.exceptions import HTTPException
from .schemas import IncasariSchema
from .tables import IncasariTabel
from playhouse.shortcuts import model_to_dict
from settings import cfg
from cursvalutarbnr import Currency, ron_exchange_rate


def preia_incasari(page: int):
    try:
        return [
            model_to_dict(m)
            for m in IncasariTabel.select()
            .order_by(IncasariTabel.modificat_la.desc())
            .paginate(page, 100)
        ]
    except Exception as err:
        log.exception(err)
        raise HTTPException(
            status_code=500, detail="Nu am putut prelua incasarile din baza de date."
        )


def salveaza_incasare(incasare: IncasariSchema):
    try:

        # Convert foreign currency to RON
        if (
            incasare.moneda != Currency.RON
            and incasare.data_incasare
            and incasare.suma_incasata > 0
        ):
            log.info(f"Conversie {incasare.moneda} la {Currency.RON} pentru suma {incasare.suma_incasata}.")
            incasare.suma_incasata = ron_exchange_rate(
                ammount=incasare.suma_incasata,
                to_currency=incasare.moneda,
                date=incasare.data_incasare,
            )
            incasare.moneda = Currency.RON
            log.info(f"Conversie realizata! Suma in RON este: {incasare.suma_incasata}.")

        payload = incasare.model_dump()
        data = IncasariTabel(**payload)
        data.save()
        payload["id"] = data.id
        return payload
    
    except Exception as err:
        log.exception(err)
        raise HTTPException(
            status_code=500, detail="Nu am putut salva incasarea in baza de date."
        )


def sterge_incasare(incasare_id: int):
    try:
        incasare = IncasariTabel.get(IncasariTabel.id == incasare_id)
        os.remove(cfg.get_file_path(incasare.nume_fisier))
        return incasare.delete_instance()
    except Exception as err:
        log.exception(err)
        raise HTTPException(
            status_code=500, detail="Nu am putut salva sterge incasarea."
        )
