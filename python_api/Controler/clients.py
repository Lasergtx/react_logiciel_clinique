from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.clients import ClientService
from Model.clients import CreateClients

router = APIRouter(
    prefix="/clients",
    tags=["clients"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_clients():
    result = await ClientService.get_all()
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_client_by_id(id: int = Path(..., alias="id")):
    result = await ClientService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_client(data: CreateClients):
    result = await ClientService.create(data)
    return ResponseSchema(detail="Successfully created data", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_client(id: int = Path(..., alias="id"),*, data: CreateClients):
    result = await ClientService.update(id, data)
    return ResponseSchema(detail="Successfully updated data", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_client(id: int = Path(..., alias="id")):
    result = await ClientService.delete(id)
    return ResponseSchema(detail="Successfully deleted data", result=result)