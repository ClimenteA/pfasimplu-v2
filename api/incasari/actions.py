from fastapi.exceptions import HTTPException
from .schemas import IncasariSchema
from api.logger import log
from .tables import IncasariTabel


def salveaza_incasare(incasare: IncasariSchema):
    try:
        payload = incasare.model_dump()
        data = IncasariTabel(**payload)
        data.save()
        payload["id"] = data.id
        return payload
    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=500, detail="Nu am putut salva incasarea in baza de date.")
