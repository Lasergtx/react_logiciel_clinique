from Model.patients import CreatePatient
from Repository.patients import PatientsRepository

class PatientsService:

    @staticmethod
    async def get_all():
        return await PatientsRepository.get_all()

    @staticmethod
    async def get_by_id(id: int):
        return await PatientsRepository.get_by_id(id)

    @staticmethod
    async def create(patient: CreatePatient):
        return await PatientsRepository.create(patient)

    @staticmethod
    async def update(id: int, patient: CreatePatient):
        return await PatientsRepository.update(id, patient)

    @staticmethod
    async def delete(id: int):
        return await PatientsRepository.delete(id)
