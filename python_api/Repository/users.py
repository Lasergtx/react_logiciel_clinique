from Model.users import CreateUser
from Config.Connection import prisma_connection

class UsersRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.users.find_many()

    @staticmethod
    async def get_by_id(id: int):
        return await prisma_connection.prisma.users.find_first(
            where={
                "userid": id
            }
        )

    @staticmethod
    async def create(user: CreateUser):
        return await prisma_connection.prisma.users.create(
            data={
                "username": user.username,
                "password": user.password,
                "role": user.role,
            }
        )

    @staticmethod
    async def update(id: int, user: CreateUser):
        await prisma_connection.prisma.users.update(
            where={
                "userid": id
            },
            data={
                "username": user.username,
                "password": user.password,
                "role": user.role,
            }
        )

    @staticmethod
    async def delete(id: int):
        await prisma_connection.prisma.users.delete(
            where={
                "userid": id
            }
        )
