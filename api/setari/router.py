from fastapi import APIRouter
from .models import DatePFA
from .actions import salveaza_date_pfa, get_date_pfa


router = APIRouter(tags=["Setari"], prefix="/setari")



@router.get("/date-pfa")
async def get_pfa():
    return get_date_pfa() 
    
@router.post("/date-pfa", response_model=DatePFA)
async def save_pfa_data(payload: DatePFA):
    return salveaza_date_pfa(payload)
    
    