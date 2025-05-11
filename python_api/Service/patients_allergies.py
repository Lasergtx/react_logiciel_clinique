from Repository.patients_allergies import PARepository
from Model.patients_allergies import CreatePA

class PAService:

    @staticmethod
    async def get_all():
        return await PARepository.get_all()

    @staticmethod
    async def get_by_id(patientid: int, allergyid: int):
        return await PARepository.get_by_id(patientid, allergyid)

    @staticmethod
    async def get_by_patientid(patientid: int):
        return await PARepository.get_by_patientid(patientid)

    @staticmethod
    async def get_by_allergieid(allergyid: int):
        return await PARepository.get_by_allergieid(allergyid)

    @staticmethod
    async def create(PA: CreatePA):
        return await PARepository.create(PA)

    @staticmethod
    async def delete(patientid: int, allergyid: int):
        return await PARepository.delete(patientid, allergyid)