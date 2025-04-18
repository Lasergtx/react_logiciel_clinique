from Config.Connection import prisma_connection

class ItemsBoughtRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.items_bought.find_many()

    @staticmethod
    async def get_by_expenseid(id: int):
        return await prisma_connection.prisma.items_bought.find_many(
            where={
                'expenseid': id
            }
        )

    @staticmethod
    async def get_by_productid(id: int):
        return await prisma_connection.prisma.items_bought.find_many(
            where={
                'productid': id
            }
        )