import os
import uuid
import shutil
from pathvalidate import sanitize_filename
from fastapi.responses import FileResponse
from fastapi import Depends, UploadFile
from fastapi.exceptions import HTTPException
from sqlmodel import Session
from .models import TipFisier
from api.incasari.models import Incasari
from api.database import get_session
from api.logger import log
from settings import cfg


def preia_fisier(filename: str):
    return FileResponse(os.path.join(cfg.SAVE_PATH, filename))


def incarca_fisier_incasari(file: UploadFile, tipFisier: TipFisier, db: Session = Depends(get_session)):
    try:
        filename = uuid.uuid4().hex + f"__{tipFisier}__" + sanitize_filename(file.filename)
        save_file_path = os.path.join(cfg.SAVE_PATH, filename)
        with open(save_file_path, 'wb+') as buffer:
            shutil.copyfileobj(file.file, buffer)

        if tipFisier == TipFisier.FISIER_INCASARE:
            payload = Incasari(nume_fisier=filename)
            data = Incasari.model_validate(payload)
        # TODO
        else:
            raise HTTPException(status_code=500, detail="Acest fisier nu poate fi procesat de aplicatie.")
        db.add(data)
        db.commit()
        db.refresh(data)
        return data
    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=500, detail="Nu am putut salva fisierul.")
