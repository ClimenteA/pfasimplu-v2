from fastapi.exceptions import HTTPException
from sqlmodel import select, Session
from pydantic import ValidationError
from .models import Incasari
from api.database import engine
from api.logger import log


def salveaza_incasare(payload: Incasari):
    
    try:
        Incasari.model_validate(payload)
    except ValidationError as err:
        log.exception(err)
        raise HTTPException(
            status_code=400, detail="Completeaza toate campurile corect."
        )

    try:
        with Session(engine) as session:
            statement = select(Incasari).where(Incasari.id == payload.id)
            results = session.exec(statement)
            session.commit()
            return results
    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=500, detail="Nu am putut salva incasarea in baza de date.")
