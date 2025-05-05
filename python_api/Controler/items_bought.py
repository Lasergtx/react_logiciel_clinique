from Service.items_bought import ItemsBoughtService
from fastapi import APIRouter, Path
from schema import ResponseSchema

router = APIRouter(
    prefix="/items_bought",
    tags=["items_bought"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_items_bought():
    result = await ItemsBoughtService.get_all()
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("/{expenseid}/{productid}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_item_bought_by_id(expenseid: int, productid: int):
    result = await ItemsBoughtService.get_by_id(expenseid, productid)
    return ResponseSchema(detail="Successfully fetched data", result=result)

@router.get("_depense/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_items_bought_by_expenseid(id: int = Path(..., alias="id")):
    result = await ItemsBoughtService.get_by_expenseid(id)
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("_produit/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_items_bought_by_productid(id: int = Path(..., alias="id")):
    result = await ItemsBoughtService.get_by_productid(id)
    return ResponseSchema(detail="Successfully fetched all data", result=result)