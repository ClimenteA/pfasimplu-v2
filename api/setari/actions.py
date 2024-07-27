from fastapi import Depends
from fastapi.exceptions import HTTPException
from sqlmodel import Session, text
from .models import DatePFA
from api.database import get_session
from api.logger import log


def salveaza_date_pfa(payload: DatePFA, db: Session = Depends(get_session)):
    try:
        data = DatePFA.model_validate(payload)
    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=400, detail="Completeaza toate campurile cu datele corecte")
    
    try:
        db.exec(text("DELETE FROM datePFA"))
        db.add(data)
        db.commit()
        db.refresh(data)
        return data
    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=500, detail="Nu am putut salva datele.")