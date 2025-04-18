from Model.expenses import CreateExpense
from Model.items import CreateItem
from Config.Connection import prisma_connection

class ExpenseRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.expenses.find_many()

    @staticmethod
    async def get_by_id(id: int):
        return await prisma_connection.prisma.expenses.find_first(
            where={
                'expenseid': id
            }
        )

    @staticmethod
    async def create(expense: CreateExpense, items_bought: list[CreateItem] | None):
        newExpense = await prisma_connection.prisma.expenses.create(
            data={
                'amount': expense.amount,
                'description': expense.description,
            }
        )
        if items_bought is not None:
            for item in items_bought:
                await prisma_connection.prisma.items_bought.create(
                    data={
                        'expenseid': newExpense.expenseid,
                        'productid': item.productid,
                        'quantity': item.quantity,
                    }
                )
                product = await prisma_connection.prisma.products.find_first(
                    where={
                        'productid': item.productid,
                    }
                )
                newQuantity = product.quantity + item.quantity
                await prisma_connection.prisma.products.update(
                    where={
                        'productid': item.productid,
                    },
                    data={
                        'name': product.name,
                        'description': product.description,
                        'sellingprice': product.sellingprice,
                        'cost': product.cost,
                        'tva': product.tva,
                        'quantity': newQuantity,
                        'producttypeid': product.productid,
                    }
                )
        return newExpense

    @staticmethod
    async def update(id: int, expense: CreateExpense):
        await prisma_connection.prisma.expenses.update(
            where={
                'expenseid': id,
            },
            data={
                'amount': expense.amount,
                'description': expense.description,
            }
        )

    @staticmethod
    async def delete(id: int):
        await prisma_connection.prisma.expenses.delete(
            where={
                'expenseid': id,
            }
        )