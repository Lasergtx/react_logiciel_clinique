from Repository.items_sold import ItemsSoldRepository

class ItemsSoldService:

    @staticmethod
    async def get_all():
        return await ItemsSoldRepository().get_all()

    @staticmethod
    async def get_by_earningid(id: int):
        return await ItemsSoldRepository().get_by_earningid(id)

    @staticmethod
    async def get_by_productid(id: int):
        return await ItemsSoldRepository().get_by_productid(id)
