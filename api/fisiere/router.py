from fastapi import APIRouter, UploadFile
from .actions import incarca_fisier, preia_fisier, descarca_tabel
from .schemas import FisierUploadedSchema, TipDescarcare, DBTableNames

router = APIRouter(tags=["Fisiere"], prefix="/fisiere")


@router.get("/{filename}")
async def get_file(filename: str):
    return preia_fisier(filename)
    

@router.post("/incarca", response_model=FisierUploadedSchema)
async def upload_file(file: UploadFile):
    return incarca_fisier(file)


@router.get("/descarca/{tabel}")
async def descarca(tip_descarcare: TipDescarcare, tabel: DBTableNames):
    return descarca_tabel(tip_descarcare, tabel)
    