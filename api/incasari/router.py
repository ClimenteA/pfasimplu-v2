from fastapi import APIRouter, Depends
from sqlmodel import Session
from .models import Incasari
from .actions import salveaza_incasare
from ..database import get_session


router = APIRouter(tags=["Incasari"], prefix="/incasari")

@router.post("/salveaza", response_model=Incasari)
async def save(payload: Incasari, db: Session = Depends(get_session)):
    return salveaza_incasare(payload, db)
    
    