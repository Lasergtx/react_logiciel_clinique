from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.products import ProductService
from Model.products import CreateProduct

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_products():
    result = await ProductService.get_all()
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_product_by_id(id: int = Path(..., alias="id")):
    result = await ProductService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_product(data: CreateProduct):
    result = await ProductService.create(data)
    return ResponseSchema(detail="Successfully created data", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_product(id: int = Path(..., alias="id"),*, data: CreateProduct):
    result = await ProductService.update(id, data)
    return ResponseSchema(detail="Successfully updated data", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_product(id: int = Path(..., alias="id")):
    result = await ProductService.delete(id)
    return ResponseSchema(detail="Successfully deleted data", result=result)