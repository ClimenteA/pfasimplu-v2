from fastapi import APIRouter
from .schemas import PFASchema
from .actions import salveaza_date_pfa, get_date_pfa


router = APIRouter(tags=["Setari"], prefix="/setari")



@router.get("/date-pfa")
async def get_pfa():
    return get_date_pfa() 
    
@router.post("/date-pfa", response_model=PFASchema)
async def save_pfa_data(payload: PFASchema):
    return salveaza_date_pfa(payload)
    
    