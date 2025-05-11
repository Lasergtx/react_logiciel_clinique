from Repository.items_bought import ItemsBoughtRepository


class ItemsBoughtService:

    @staticmethod
    async def get_all():
        return await ItemsBoughtRepository().get_all()

    @staticmethod
    async def get_by_id(expenseid: int, productid: int):
        return await ItemsBoughtRepository().get_by_id(expenseid, productid)

    @staticmethod
    async def get_by_expenseid(id: int):
        return await ItemsBoughtRepository().get_by_expenseid(id)

    @staticmethod
    async def get_by_productid(id: int):
        return await ItemsBoughtRepository().get_by_productid(id)