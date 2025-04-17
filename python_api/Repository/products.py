from Model.products import CreateProduct
from Config.Connection import prisma_connection

class ProductRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.products.find_many()

    @staticmethod
    async def get_by_id(product_id: int):
        return await prisma_connection.prisma.products.find_first(
            where={
                'productid': product_id
            }
        )

    @staticmethod
    async def create(product: CreateProduct):
        return await prisma_connection.prisma.products.create({
            'name': product.name,
            'description': product.description,
            'sellingprice': product.sellingprice,
            'cost': product.cost,
            'tva': product.tva,
            'quantity': product.quantity,
            'producttypeid': product.producttypeid
        })

    @staticmethod
    async def delete(product_id: int):
        await prisma_connection.prisma.products.delete(
            where={
                'productid': product_id
            }
        )

    @staticmethod
    async def update(product_id: int, product: CreateProduct):
        await prisma_connection.prisma.products.update(
            where={
                'productid': product_id
            },
            data={
                'name': product.name,
                'description': product.description,
                'sellingprice': product.sellingprice,
                'cost': product.cost,
                'tva': product.tva,
                'quantity': product.quantity,
                'producttypeid': product.producttypeid
            }
        )