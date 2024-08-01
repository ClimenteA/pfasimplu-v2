from fastapi.exceptions import HTTPException
from .schemas import PFASchema
from .tables import PFATable
from api.logger import log
from playhouse.shortcuts import model_to_dict


def get_date_pfa():
    try:
        data = PFATable.select()
        return [model_to_dict(d) for d in data][0] if len(data) == 1 else {}
    except Exception as err:
        log.exception(err)
        raise HTTPException(
            status_code=400, detail="Nu am putut prelua datele pfa-ului"
        )


def salveaza_date_pfa(pfa: PFASchema):
    try:
        payload = pfa.model_dump()
        payload.pop("id")
        PFATable.delete().execute()
        data = PFATable(**payload)
        data.save()
        payload["id"] = data.id
        return payload
    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=500, detail="Nu am putut salva datele.")
