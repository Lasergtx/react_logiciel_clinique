from Repository.earnings import EarningRepository
from Model.earnings import CreateEarning
from Model.items import CreateItem

class EarningService:

    @staticmethod
    async def get_all():
        return await EarningRepository.get_all()

    @staticmethod
    async def get_by_id(id: int):
        return await EarningRepository.get_by_id(id)

    @staticmethod
    async def create(earning: CreateEarning, items_sold: list[CreateItem] | None):
        return await EarningRepository.create(earning, items_sold)

    @staticmethod
    async def update(id: int, earning: CreateEarning):
        return await EarningRepository.update(id, earning)

    @staticmethod
    async def delete(id: int):
        return await EarningRepository.delete(id)

