from Repository.allergies import AllergiesRepository
from Model.allergies import CreateAllergy

class AllergyService:

    @staticmethod
    async def get_all():
        return await AllergiesRepository.get_all()

    @staticmethod
    async def get_by_id(id: int):
        return await AllergiesRepository.get_by_id(id)

    @staticmethod
    async def create(allergy: CreateAllergy):
        return await AllergiesRepository.create(allergy)

    @staticmethod
    async def update(id: int, allergy: CreateAllergy):
        return await AllergiesRepository.update(id, allergy)

    @staticmethod
    async def delete(id: int):
        return await AllergiesRepository.delete(id)