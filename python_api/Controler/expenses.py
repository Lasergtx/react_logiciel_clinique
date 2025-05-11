from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.expenses import ExpenseService
from Model.expenses import CreateExpense
from Model.items import CreateItem

router = APIRouter(
    prefix="/expenses",
    tags=["expenses"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_expenses():
    result = await ExpenseService.get_all()
    return ResponseSchema(detail="Successfully fetched all data", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_expense_by_id(id: int = Path(..., alias="id")):
    result = await ExpenseService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_expense(expense: CreateExpense, items_bought: list[CreateItem] = None):
    result = await ExpenseService.create(expense, items_bought)
    return ResponseSchema(detail="Successfully created data", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_expense(id: int = Path(..., alias="id"),*, data: CreateExpense):
    result = await ExpenseService.update(id, data)
    return ResponseSchema(detail="Successfully updated data", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_expense(id: int = Path(..., alias="id")):
    result = await ExpenseService.delete(id)
    return ResponseSchema(detail="Successfully deleted data", result=result)