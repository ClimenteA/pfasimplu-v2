from api.logger import log
from fastapi.exceptions import HTTPException
from .schemas import IncasariSchema
from .tables import IncasariTabel
from playhouse.shortcuts import model_to_dict


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
