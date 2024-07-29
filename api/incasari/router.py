from fastapi import APIRouter, Depends, UploadFile
from sqlmodel import Session
from .models import Incasari
from .actions import incarca_fisier_incasari, preia_fisier
from ..database import get_session


router = APIRouter(tags=["Incasari"], prefix="/incasari")


@router.get("/fisier/{filename}")
async def get_incasari_file(filename: str):
    return preia_fisier(filename)
    

@router.post("/incarca", response_model=Incasari)
async def upload_incasari_file(file: UploadFile, db: Session = Depends(get_session)):
    return incarca_fisier_incasari(file, db)
    
    