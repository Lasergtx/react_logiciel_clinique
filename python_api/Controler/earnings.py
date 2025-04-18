from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.earnings import EarningService
from Model.earnings import CreateEarning
from Model.items import CreateItem

router = APIRouter(
    prefix="/earnings",
    tags=["earnings"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_earnings():
    result = await EarningService.get_all()
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_earning_by_id(id: int = Path(..., alias="id")):
    result = await EarningService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_earning(earning: CreateEarning, items_sold: list[CreateItem] = None):
    result = await EarningService.create(earning, items_sold)
    return ResponseSchema(detail="Successfully created data", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_earning(id: int = Path(..., alias="id"),*, data: CreateEarning):
    result = await EarningService.update(id, data)
    return ResponseSchema(detail="Successfully updated data", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_earning(id: int = Path(..., alias="id")):
    result = await EarningService.delete(id)
    return ResponseSchema(detail="Successfully deleted data", result=result)