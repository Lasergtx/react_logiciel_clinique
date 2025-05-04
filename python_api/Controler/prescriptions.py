from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.prescriptions import PrescriptionsService
from Model.prescriptions import CreatePrescription

router = APIRouter(
    prefix="/prescriptions",
    tags=["prescriptions"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_prescriptions():
    result = await PrescriptionsService.get_all()
    return ResponseSchema(detail="Successfully fetched all prescriptions", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_prescription_by_id(id: int = Path(..., alias="id")):
    result = await PrescriptionsService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched prescription data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_prescription(data: CreatePrescription):
    result = await PrescriptionsService.create(data)
    return ResponseSchema(detail="Successfully created prescription", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_prescription(id: int = Path(..., alias="id"), *, data: CreatePrescription):
    result = await PrescriptionsService.update(id, data)
    return ResponseSchema(detail="Successfully updated prescription", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_prescription(id: int = Path(..., alias="id")):
    result = await PrescriptionsService.delete(id)
    return ResponseSchema(detail="Successfully deleted prescription", result=result)