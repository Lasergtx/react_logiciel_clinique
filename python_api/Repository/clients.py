from Model.clients import CreateClients
from Config.Connection import prisma_connection

class ClientRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.clients.find_many()

    @staticmethod
    async def get_by_id(id: int):
        return await prisma_connection.prisma.clients.find_first(
            where={
                'clientid': id
            }
        )
    @staticmethod
    async def create(client: CreateClients):
        return await prisma_connection.prisma.clients.create(
            data={
                'lastname': client.lastname,
                'firstname': client.firstname,
                'gender': client.gender,
                'phonenumber': client.phonenumber,
                'email': client.email,
                'address': client.address,
                'zipcode': client.zipcode,
                'city': client.city,
            }
        )

    @staticmethod
    async def update(id: int, client: CreateClients):
        await prisma_connection.prisma.clients.update(
            where={
                'clientid': id
            },
            data={
                'lastname': client.lastname,
                'firstname': client.firstname,
                'gender': client.gender,
                'phonenumber': client.phonenumber,
                'email': client.email,
                'address': client.address,
                'zipcode': client.zipcode,
                'city': client.city,
            }
        )

    @staticmethod
    async def delete(id: int):
        await prisma_connection.prisma.clients.delete(
            where={
                'clientid': id
            }
        )