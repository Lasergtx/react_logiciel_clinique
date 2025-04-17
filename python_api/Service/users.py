from Model.users import CreateUser
from Repository.users import UsersRepository

class UsersService:

    @staticmethod
    async def get_all():
        return await UsersRepository.get_all()

    @staticmethod
    async def get_by_id(id: int):
        return await UsersRepository.get_by_id(id)

    @staticmethod
    async def create(user: CreateUser):
        return await UsersRepository.create(user)

    @staticmethod
    async def update(id: int, user: CreateUser):
        return await UsersRepository.update(id, user)

    @staticmethod
    async def delete(id: int):
        return await UsersRepository.delete(id)