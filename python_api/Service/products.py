from Repository.products import ProductRepository
from Model.products import CreateProduct

class ProductService:

    @staticmethod
    async def get_all():
        return await ProductRepository.get_all()

    @staticmethod
    async def get_by_id(productid: int):
        return await ProductRepository.get_by_id(productid)

    @staticmethod
    async def create(product: CreateProduct):
        return await ProductRepository.create(product)

    @staticmethod
    async def update(productid: int, product: CreateProduct):
        return await ProductRepository.update(productid, product)

    @staticmethod
    async def delete(productid: int):
        return await ProductRepository.delete(productid)

