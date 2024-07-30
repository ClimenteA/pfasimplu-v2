from fastapi.exceptions import HTTPException
from sqlmodel import Session, select, delete
from .models import DatePFA
from api.database import engine
from api.logger import log


def get_date_pfa():
    try:
        with Session(engine) as session:
            results = session.exec(select(DatePFA)).first() or {"id": None}
            return results
    except Exception as err:
        log.exception(err)
        raise HTTPException(
            status_code=400, detail="Nu am putut prelua datele pfa-ului"
        )


def salveaza_date_pfa(payload: DatePFA):
    try:
        data = DatePFA.model_validate(payload)
    except Exception as err:
        log.info(err)
        raise HTTPException(
            status_code=400, detail="Formularul este incomplet"
        )

    try:
        with Session(engine) as session:
            session.exec(delete(DatePFA))
            session.add(data)
            session.commit()
            session.refresh(data)
            return data
    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=500, detail="Nu am putut salva datele.")
