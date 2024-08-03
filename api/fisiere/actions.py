import os
import uuid
import shutil
import zipfile
import pandas as pd
from datetime import datetime
from pathvalidate import sanitize_filename
from fastapi.responses import FileResponse
from fastapi import UploadFile
from fastapi.exceptions import HTTPException
from api.logger import log
from settings import cfg
from .tables import FisiereTabel
from .schemas import FisiereSchema, FisierUploadedSchema, TipDescarcare, DBTableNames
from playhouse.shortcuts import model_to_dict
from api.incasari.tables import IncasariTabel


def create_zip(filepaths: list[str], zipname: str):
    zippath = os.path.join(cfg.EXPORT_PATH, zipname) + ".zip"
    with zipfile.ZipFile(zippath, "w") as zipf:
        for file in filepaths:
            zipf.write(file, arcname=os.path.basename(file))
    return zippath


def preia_fisier(filename: str):
    return FileResponse(cfg.get_file_path(filename) or "")


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


def descarca_tabel(tip_descarcare: TipDescarcare, tabel: DBTableNames):
    try:

        page = 1
        filepaths = []
        chunk_size = 500_000
        if tabel == DBTableNames.incasaritabel:
            tabel = datetime.now().date().isoformat() + "_" +  tabel 
            while True:
                chunk = [
                    model_to_dict(m)
                    for m in IncasariTabel.select().paginate(page, chunk_size)
                ]

                if len(chunk) == 0:
                    break

                df = pd.DataFrame.from_records(chunk)

                partial_fp = os.path.join(cfg.EXPORT_PATH, f"{tabel}_page_{page}")

                if tip_descarcare == TipDescarcare.XLSX:
                    fp = partial_fp + ".xlsx"
                    df.to_excel(fp)
                    filepaths.append(fp)
                elif tip_descarcare == TipDescarcare.CSV:
                    fp = partial_fp + ".csv"
                    df.to_csv(fp, index=False)
                    filepaths.append(fp)
                else:
                    raise ValueError("Tipul descarcari poate fi doar XLSX sau CSV")

                page += 1

        if len(filepaths) == 0:
            raise ValueError("Nu sunt inregistrari pentru moment.")

        if len(filepaths) > 1:
            zipfilepath = create_zip(filepaths, zipname=tabel)
            return FileResponse(
                zipfilepath,
                filename=os.path.basename(zipfilepath),
                media_type="application/octet-stream",
            )
        else:
            return FileResponse(
                filepaths[0],
                filename=os.path.basename(filepaths[0]),
                media_type="application/octet-stream",
            )

    except Exception as err:
        log.exception(err)
        raise HTTPException(status_code=500, detail="Nu am putut descarca fisierul.")
