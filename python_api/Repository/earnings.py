from Model.earnings import CreateEarning
from Model.items import CreateItem
from Config.Connection import prisma_connection

class EarningRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.earnings.find_many()

    @staticmethod
    async def get_by_id(id: int):
        return await prisma_connection.prisma.earnings.find_first(
            where={
                'earningid': id
            }
        )

    @staticmethod
    async def create(earning: CreateEarning, items_sold: list[CreateItem] | None):
        newEarning = await prisma_connection.prisma.earnings.create(
            data={
                'amount': earning.amount,
                'description': earning.description,
                'paymentstatus': earning.paymentstatus,
                'clientid': earning.clientid
            }
        )
        if items_sold is not None:
            for item in items_sold:
                await prisma_connection.prisma.items_sold.create(
                    data={
                        'earningid': newEarning.earningid,
                        'productid': item.productid,
                        'quantity': item.quantity,
                    }
                )
                product = await prisma_connection.prisma.products.find_first(
                    where={
                        'productid': item.productid,
                    }
                )
                newQuantity = product.quantity - item.quantity
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
        return newEarning

    @staticmethod
    async def update(id: int, earning: CreateEarning):
        await prisma_connection.prisma.earnings.update(
            where={
                'earningid': id
            },
            data={
                'amount': earning.amount,
                'description': earning.description,
                'paymentstatus': earning.paymentstatus,
                'clientid': earning.clientid
            }
        )

    @staticmethod
    async def delete(earning: CreateEarning):
        await prisma_connection.prisma.earnings.delete(
            where={
                'earningid': earning.id
            }
        )
