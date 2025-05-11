from Repository.clients import ClientRepository
from Model.clients import CreateClients

class ClientService:

    @staticmethod
    async def get_all():
        return await ClientRepository.get_all()

    @staticmethod
    async def get_by_id(id: int):
        return await ClientRepository.get_by_id(id)

    @staticmethod
    async def create(client: CreateClients):
        return await ClientRepository.create(client)

    @staticmethod
    async def update(id: int, client: CreateClients):
        return await ClientRepository.update(id, client)

    @staticmethod
    async def delete(id: int):
        return await ClientRepository.delete(id)