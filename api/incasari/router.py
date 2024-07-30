from fastapi import APIRouter
from .models import Incasari
from .actions import salveaza_incasare


router = APIRouter(tags=["Incasari"], prefix="/incasari")

@router.post("/salveaza", response_model=Incasari)
async def save(payload: Incasari):
    return salveaza_incasare(payload)
    
    