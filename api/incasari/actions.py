from fastapi import Depends
from fastapi.exceptions import HTTPException
from sqlmodel import Session
from .models import Incasari
from api.database import get_session
from api.logger import log


def salveaza_incasare(payload: Incasari, db: Session = Depends(get_session)):
    try:
        data = Incasari.model_validate(Incasari(payload))
        db.add(data)
        db.commit()
        db.refresh(data)
        return data    
    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=500, detail="Nu am putut salva incasarea.")
