from Model.boostershots import CreateBoosterShot
from Repository.boostershots import BoosterShotsRepository

class BoosterShotsService:

    @staticmethod
    async def get_all():
        return await BoosterShotsRepository.get_all()

    @staticmethod
    async def get_by_id(boostershot_id: int):
        return await BoosterShotsRepository.get_by_id(boostershot_id)

    @staticmethod
    async def create(boostershot: CreateBoosterShot):
        print([e.value for e in CreateBoosterShot.model_fields['status'].annotation])
        return await BoosterShotsRepository.create(boostershot)

    @staticmethod
    async def update(boostershot_id: int, boostershot: CreateBoosterShot):
        return await BoosterShotsRepository.update(boostershot_id, boostershot)

    @staticmethod
    async def delete(boostershot_id: int):
        return await BoosterShotsRepository.delete(boostershot_id)

