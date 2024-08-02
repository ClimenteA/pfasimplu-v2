from fastapi import APIRouter
from .schemas import IncasariSchema
from .actions import salveaza_incasare, preia_incasari, sterge_incasare


router = APIRouter(tags=["Incasari"], prefix="/incasari")


@router.get("/salvate", response_model=list[IncasariSchema])
async def get_incasari(page: int):
    return preia_incasari(page)
    

@router.post("/salveaza", response_model=IncasariSchema)
async def save_incasari(payload: IncasariSchema):
    return salveaza_incasare(payload)
    
    
@router.delete("/sterge", response_model=int)
async def delete_incasare(incasare_id: int):
    return sterge_incasare(incasare_id)
    