from fastapi import APIRouter, Depends
from sqlmodel import Session
from .models import DatePFA
from .actions import salveaza_date_pfa, get_date_pfa
from ..database import get_session


router = APIRouter(tags=["Setari"], prefix="/setari")



@router.get("/date-pfa")
async def get_pfa(db: Session = Depends(get_session)):
    return get_date_pfa(db) 
    
@router.post("/date-pfa", response_model=DatePFA)
async def save_pfa_data(payload: DatePFA, db: Session = Depends(get_session)):
    return salveaza_date_pfa(payload, db)
    
    