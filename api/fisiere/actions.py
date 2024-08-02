import os
import uuid
import shutil
from pathvalidate import sanitize_filename
from fastapi.responses import FileResponse
from fastapi import UploadFile
from fastapi.exceptions import HTTPException
from api.logger import log
from settings import cfg
from .schemas import FisiereSchema, FisierUploadedSchema
from .tables import FisiereTabel


def preia_fisier(filename: str):
    return FileResponse(os.path.join(cfg.SAVE_PATH, filename))


def incarca_fisier(file: UploadFile):
    try:
        filename = uuid.uuid4().hex + "_" + sanitize_filename(file.filename)
        save_file_path = os.path.join(cfg.SAVE_PATH, filename)
        with open(save_file_path, "wb+") as buffer:
            shutil.copyfileobj(file.file, buffer)

        data = FisiereSchema(cale_fisier=save_file_path).model_dump()
        fisier = FisiereTabel(**data)
        fisier.save()

        return FisierUploadedSchema(
            fisier_id=fisier.id,
            nume_fisier=filename,
            url_fisier=f"{'https' if cfg.SECURE_URL else 'http'}://{cfg.HOST}:{cfg.PORT}/v1/fisiere/{filename}",
        )
    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=500, detail="Nu am putut salva fisierul.")
