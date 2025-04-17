from Repository.productTypes import ProductTypesRepository
from Model.productTypes import CreateProductType

class ProductTypesService:

    @staticmethod
    async def get_all():
        return await ProductTypesRepository.get_all()

    @staticmethod
    async def get_by_id(id: int):
        return await ProductTypesRepository.get_by_id(id)

    @staticmethod
    async def create(data: CreateProductType):
        return await ProductTypesRepository.create(data)

    @staticmethod
    async def update(id: int, data: CreateProductType):
        return await ProductTypesRepository.update(id, data)

    @staticmethod
    async def delete(id: int):
        return await ProductTypesRepository.delete(id)