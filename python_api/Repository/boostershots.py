from Model.boostershots import CreateBoosterShot
from Config.Connection import prisma_connection
from datetime import datetime

class BoosterShotsRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.booster_shots.find_many()

    @staticmethod
    async def get_by_id(id: int):
        return await prisma_connection.prisma.booster_shots.find_first(
            where={
                'boostershotid': id
            }
        )

    @staticmethod
    async def create(boostershot: CreateBoosterShot):
        return await prisma_connection.prisma.booster_shots.create(
            data={
                'type': boostershot.type,
                'initialdate': datetime.combine(boostershot.initialdate, datetime.min.time()),
                'executiondate': datetime.combine(boostershot.executiondate, datetime.min.time()) if boostershot.executiondate else None,
                'status': boostershot.status,
                'patientid': boostershot.patientid
            }
        )

    @staticmethod
    async def update(id: int, boostershot: CreateBoosterShot):
        await prisma_connection.prisma.booster_shots.update(
            where={
                'boostershotid': id,
            },
            data={
                'type': boostershot.type,
                'initialdate': datetime.combine(boostershot.initialdate, datetime.min.time()),
                'executiondate': datetime.combine(boostershot.executiondate, datetime.min.time()) if boostershot.executiondate else None,
                'status': boostershot.status,
                'patientid': boostershot.patientid
            }
        )

    @staticmethod
    async def delete(id: int):
        return await prisma_connection.prisma.booster_shots.delete(
            where={
                'boostershotid': id
            }
        )