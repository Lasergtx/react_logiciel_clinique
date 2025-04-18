from Service.items_sold import ItemsSoldService
from fastapi import APIRouter, Path
from schema import ResponseSchema

router = APIRouter(
    prefix="/items_sold",
    tags=["items_sold"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_items_sold():
    result = await ItemsSoldService.get_all()
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("gains/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_items_sold_by_earningid(id: int = Path(..., alias="id")):
    result = await ItemsSoldService.get_by_earningid(id)
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("produit/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_items_sold_by_productid(id: int = Path(..., alias="id")):
    result = await ItemsSoldService.get_by_productid(id)
    return ResponseSchema(detail="Successfully fetched all data", result=result)