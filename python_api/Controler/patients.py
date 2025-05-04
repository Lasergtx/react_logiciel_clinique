from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.patients import PatientsService
from Model.patients import CreatePatient

router = APIRouter(
    prefix="/patients",
    tags=["patients"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_patients():
    result = await PatientsService.get_all()
    return ResponseSchema(detail="Successfully fetched all patients", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_patient_by_id(id: int = Path(..., alias="id")):
    result = await PatientsService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched patient data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_patient(data: CreatePatient):
    result = await PatientsService.create(data)
    return ResponseSchema(detail="Successfully created patient", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_patient(id: int = Path(..., alias="id"), *, data: CreatePatient):
    result = await PatientsService.update(id, data)
    return ResponseSchema(detail="Successfully updated patient", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_patient(id: int = Path(..., alias="id")):
    result = await PatientsService.delete(id)
    return ResponseSchema(detail="Successfully deleted patient", result=result)