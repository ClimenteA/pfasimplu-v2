from fastapi import APIRouter
from .schemas import IncasariSchema
from .actions import salveaza_incasare


router = APIRouter(tags=["Incasari"], prefix="/incasari")

@router.post("/salveaza", response_model=IncasariSchema)
async def save(payload: IncasariSchema):
    return salveaza_incasare(payload)
    
    