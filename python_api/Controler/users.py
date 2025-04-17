from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.users import UsersService
from Model.users import CreateUser

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_users():
    result = await UsersService.get_all()
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_user_by_id(id: int = Path(..., alias="id")):
    result = await UsersService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_user(data: CreateUser):
    result = await UsersService.create(data)
    return ResponseSchema(detail="Successfully created data", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_user(id: int = Path(..., alias="id"),*, data: CreateUser):
    result = await UsersService.update(id, data)
    return ResponseSchema(detail="Successfully updated data", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_user(id: int = Path(..., alias="id")):
    result = await UsersService.delete(id)
    return ResponseSchema(detail="Successfully deleted data", result=result)