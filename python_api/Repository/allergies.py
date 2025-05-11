from Model.allergies import CreateAllergy
from Config.Connection import prisma_connection

class AllergiesRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.allergies.find_many()

    @staticmethod
    async def get_by_id(id: int):
        return await prisma_connection.prisma.allergies.find_first(
            where={
                "allergyid": id
            }
        )

    @staticmethod
    async def create(allergy: CreateAllergy):
        return await prisma_connection.prisma.allergies.create(
            data={
                "name": allergy.name,
                "description": allergy.description
            }
        )

    @staticmethod
    async def update(id: int, allergy: CreateAllergy):
        await prisma_connection.prisma.allergies.update(
            where={
                "allergyid": id
            },
            data={
                "name": allergy.name,
                "description": allergy.description
            }
        )

    @staticmethod
    async def delete(id: int):
        await prisma_connection.prisma.allergies.delete(
            where={
                "allergyid": id
            }
        )