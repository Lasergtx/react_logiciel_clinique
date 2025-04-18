from Model.expenses import CreateExpense
from Model.items import CreateItem
from Repository.expenses import ExpenseRepository

class ExpenseService:

    @staticmethod
    async def get_all():
        return await ExpenseRepository.get_all()

    @staticmethod
    async def get_by_id(id: int):
        return await ExpenseRepository.get_by_id(id)

    @staticmethod
    async def create(expense: CreateExpense, items_bought: list[CreateItem] | None):
        return await ExpenseRepository.create(expense, items_bought)

    @staticmethod
    async def update(id: int, expense: CreateExpense):
        return await ExpenseRepository.update(id, expense)

    @staticmethod
    async def delete(id: int):
        return await ExpenseRepository.delete(id)