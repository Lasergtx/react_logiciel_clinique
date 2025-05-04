from Model.prescriptions import CreatePrescription
from Config.Connection import prisma_connection

class PrescriptionsRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.prescriptions.find_many()

    @staticmethod
    async def get_by_id(id: int):
        return await prisma_connection.prisma.prescriptions.find_first(
            where={
                'prescriptionid': id
            }
        )

    @staticmethod
    async def create(prescription: CreatePrescription):
        return await prisma_connection.prisma.prescriptions.create(
            data={
                'motive': prescription.motive,
                'prescriptionlink': prescription.prescriptionlink,
                'patientid': prescription.patientid
            }
        )

    @staticmethod
    async def update(id: int, prescription: CreatePrescription):
        await prisma_connection.prisma.prescriptions.update(
            where={
                'prescriptionid': id,
            },
            data={
                'motive': prescription.motive,
                'prescriptionlink': prescription.prescriptionlink,
                'patientid': prescription.patientid
            }
        )

    @staticmethod
    async def delete(id: int):
        return await prisma_connection.prisma.prescriptions.delete(
            where={
                'prescriptionid': id
            }
        )