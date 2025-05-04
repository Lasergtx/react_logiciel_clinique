from Model.prescriptions import CreatePrescription
from Repository.prescriptions import PrescriptionsRepository

class PrescriptionsService:

    @staticmethod
    async def get_all():
        return await PrescriptionsRepository.get_all()

    @staticmethod
    async def get_by_id(prescription_id: int):
        return await PrescriptionsRepository.get_by_id(prescription_id)

    @staticmethod
    async def create(prescription: CreatePrescription):
        return await PrescriptionsRepository.create(prescription)

    @staticmethod
    async def update(prescription_id: int, prescription: CreatePrescription):
        return await PrescriptionsRepository.update(prescription_id, prescription)

    @staticmethod
    async def delete(prescription_id: int):
        return await PrescriptionsRepository.delete(prescription_id)