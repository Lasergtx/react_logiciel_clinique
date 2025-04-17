from prisma import Prisma

class prismaConnetion:

    def __init__(self):
        self.prisma = Prisma()

    async def connect(self):
        await self.prisma.connect()

    async def disconnect(self):
        await self.prisma.disconnect()

prisma_connection = prismaConnetion()