from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.productTypes import ProductTypesService
from Model.productTypes import CreateProductType

router = APIRouter(
    prefix="/productType",
    tags=["productType"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_product_types():
    result = await ProductTypesService.get_all()
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_product_type_by_id(id: int = Path(..., alias="id")):
    result = await ProductTypesService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_product_type(data: CreateProductType):
    result = await ProductTypesService.create(data)
    return ResponseSchema(detail="Successfully created data", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_product_type(id: int = Path(..., alias="id"),*, data: CreateProductType):
    result = await ProductTypesService.update(id, data)
    return ResponseSchema(detail="Successfully updated data", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_product_type(id: int = Path(..., alias="id")):
    result = await ProductTypesService.delete(id)
    return ResponseSchema(detail="Successfully deleted data", result=result)