from Config.Connection import prisma_connection

class ItemsSoldRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.items_sold.find_many()

    @staticmethod
    async def get_by_id(earningid: int, productid: int):
        return await prisma_connection.prisma.items_sold.find_first(
            where={
                "earningid": earningid,
                "productid": productid
            }
        )

    @staticmethod
    async def get_by_earningid(id: int):
        return await prisma_connection.prisma.items_sold.find_many(
            where={
                'earningid': id
            }
        )

    @staticmethod
    async def get_by_productid(id: int):
        return await prisma_connection.prisma.items_sold.find_many(
            where={
                'productid': id
            }
        )

    @staticmethod
    async def get_by_amount_sold(id: int):
        values = await prisma_connection.prisma.items_sold.find_many(
            where={
                'productid': id
            },
            include={
                'product': True,
                'earning': True
            }
        )

        for value in values:
            for attr in list(vars(value.product).keys()):
                if attr != 'name':
                    delattr(value.product, attr)
            for attr in list(vars(value.earning).keys()):
                if attr != 'created_at':
                    delattr(value.earning, attr)


        return values