from Model.patients_allergies import CreatePA
from Config.Connection import prisma_connection

class PARepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.patients_allergies.find_many()

    @staticmethod
    async def get_by_id(patientid: int, allergyid: int):
        return await prisma_connection.prisma.patients_allergies.find_first(
            where={
                "patientid": patientid,
                "allergyid": allergyid
            }
        )

    @staticmethod
    async def get_by_patientid(patientid: int):
        return await prisma_connection.prisma.patients_allergies.find_many(
            where={
                "patientid": patientid
            }
        )

    @staticmethod
    async def get_by_allergieid(allergyid: int):
        return await prisma_connection.prisma.patients_allergies.find_many(
            where={
                "allergyid": allergyid
            }
        )

    @staticmethod
    async def create(PA: CreatePA):
        return await prisma_connection.prisma.patients_allergies.create(
            data={
                "patientid": PA.patientid,
                "allergyid": PA.allergyid,
                "status": PA.status,
            }
        )

    @staticmethod
    async def delete(patientid: int, allergyid: int):
        await prisma_connection.prisma.patients_allergies.delete(
            where={
                "patientid_allergyid": {
                    "patientid": patientid,
                    "allergyid": allergyid
                }
            }
        )