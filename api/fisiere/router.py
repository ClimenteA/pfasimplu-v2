from fastapi import APIRouter, UploadFile
from .actions import incarca_fisier, preia_fisier
from .schemas import FisierUploadedSchema

router = APIRouter(tags=["Fisiere"], prefix="/fisiere")


@router.get("/{filename}")
async def get_file(filename: str):
    return preia_fisier(filename)
    

@router.post("/incarca", response_model=FisierUploadedSchema)
async def upload_file(file: UploadFile):
    return incarca_fisier(file)
