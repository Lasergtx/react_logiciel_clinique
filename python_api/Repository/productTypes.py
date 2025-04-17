from Model.productTypes import CreateProductType
from Config.Connection import prisma_connection

class ProductTypesRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.product_types.find_many()

    @staticmethod
    async def get_by_id(productType_id: int):
        return await prisma_connection.prisma.product_types.find_first(
            where={
                'producttypeid': productType_id
            }
        )

    @staticmethod
    async def create(productType: CreateProductType):
        return await prisma_connection.prisma.product_types.create({
            'name': productType.name,
        })

    @staticmethod
    async def delete(productType_id: int):
        await prisma_connection.prisma.product_types.delete(
            where={
                'producttypeid': productType_id
            }
        )

    @staticmethod
    async def update(productType_id: int, productType: CreateProductType):
        await prisma_connection.prisma.product_types.update(
            where={
                'producttypeid': productType_id
            },
            data={
                'name': productType.name,
            }
        )