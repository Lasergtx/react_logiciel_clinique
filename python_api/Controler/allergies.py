from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.allergies import AllergyService
from Model.allergies import CreateAllergy

router = APIRouter(
    prefix="/allergies",
    tags=["allergies"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_allergies():
    result = await AllergyService.get_all()
    return ResponseSchema(detail="Successfully fetched all allergies", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_allergy_by_id(id: int = Path(..., alias="id")):
    result = await AllergyService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched allergy data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_allergy(data: CreateAllergy):
    result = await AllergyService.create(data)
    return ResponseSchema(detail="Successfully created allergy", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_allergy(id: int = Path(..., alias="id"), *, data: CreateAllergy):
    result = await AllergyService.update(id, data)
    return ResponseSchema(detail="Successfully updated allergy", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_allergy(id: int = Path(..., alias="id")):
    result = await AllergyService.delete(id)
    return ResponseSchema(detail="Successfully deleted allergy", result=result)