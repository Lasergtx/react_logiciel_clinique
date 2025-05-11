from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.patients_allergies import PAService
from Model.patients_allergies import CreatePA

router = APIRouter(
    prefix="/patients_allergies",
    tags=["patients_allergies"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_patients_allergies():
    result = await PAService.get_all()
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("/{patientid}/{allergyid}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_patient_allergy_by_id(patientid: int = Path(..., alias="patientid"), allergyid: int = Path(..., alias="allergyid")):
    result = await PAService.get_by_id(patientid, allergyid)
    return ResponseSchema(detail="Successfully fetched data", result=result)

@router.get("_patient/{patientid}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_patients_allergies_by_patientid(patientid: int = Path(..., alias="patientid")):
    result = await PAService.get_by_patientid(patientid)
    return ResponseSchema(detail="Successfully fetched data", result=result)

@router.get("_allergy/{allergyid}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_patients_allergies_by_allergyid(allergyid: int = Path(..., alias="allergyid")):
    result = await PAService.get_by_allergieid(allergyid)
    return ResponseSchema(detail="Successfully fetched data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_patient_allergy(data: CreatePA):
    result = await PAService.create(data)
    return ResponseSchema(detail="Successfully created data", result=result)

@router.delete("/{patientid}/{allergyid}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_patient_allergy(patientid: int, allergyid: int):
    result = await PAService.delete(patientid, allergyid)
    return ResponseSchema(detail="Successfully deleted data", result=result)