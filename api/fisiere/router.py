from fastapi import APIRouter, UploadFile
from sqlmodel import Session
from .actions import incarca_fisier_incasari, preia_fisier
from api.fisiere.models import TipFisier

router = APIRouter(tags=["Fisiere"], prefix="/fisiere")


@router.get("/{filename}")
async def get_file(filename: str):
    return preia_fisier(filename)
    

@router.post("/incarca")
async def upload_file(file: UploadFile, tipFisier: TipFisier):
    return incarca_fisier_incasari(file, tipFisier)
