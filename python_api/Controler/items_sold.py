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

@router.get("/{earningid}/{productid}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_item_sold_by_id(earningid: int, productid: int):
    result = await ItemsSoldService.get_by_id(earningid, productid)
    return ResponseSchema(detail="Successfully fetched item sold by id", result=result)

@router.get("_gains/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_items_sold_by_earningid(id: int = Path(..., alias="id")):
    result = await ItemsSoldService.get_by_earningid(id)
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("_produit/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_items_sold_by_productid(id: int = Path(..., alias="id")):
    result = await ItemsSoldService.get_by_productid(id)
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("_amount_sold/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_amount_sold_by_productid(id: int = Path(..., alias="id")):
    result = await ItemsSoldService.get_by_amount_sold(id)
    return ResponseSchema(detail="Successfully fetched all data", result=result)