from fastapi import Depends
from fastapi.exceptions import HTTPException
from sqlmodel import Session, text, select
from .models import DatePFA
from api.database import get_session
from api.logger import log


def get_date_pfa(db: Session = Depends(get_session)):
    try:
        return db.exec(select(DatePFA)).first()
    except Exception as err:
        log.exception(err)
        raise HTTPException(
            status_code=400, detail="Nu am putut prelua datele pfa-ului"
        )


def salveaza_date_pfa(payload: DatePFA, db: Session = Depends(get_session)):
    try:
        data = DatePFA.model_validate(payload)
    except Exception as err:
        log.exception(err)
        raise HTTPException(
            status_code=400, detail="Completeaza toate campurile cu datele corecte"
        )

    try:
        db.exec(text("DELETE FROM datePFA"))
        db.add(data)
        db.commit()
        db.refresh(data)
        return data
    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=500, detail="Nu am putut salva datele.")
