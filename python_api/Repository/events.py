from Model.events import CreateEvent
from Config.Connection import prisma_connection
from datetime import datetime

class EventsRepository:

    @staticmethod
    async def get_all():
        return await prisma_connection.prisma.events.find_many()

    @staticmethod
    async def get_by_id(id: int):
        return await prisma_connection.prisma.events.find_first(
            where={
                'eventid': id
            }
        )

    @staticmethod
    async def create(event: CreateEvent):
        return await prisma_connection.prisma.events.create(
            data={
                'title': event.title,
                'description': event.description,
                'type': event.type,
                'eventdate': datetime.combine(event.eventdate, datetime.min.time()),
                'starthour': datetime.combine(datetime.today(), event.starthour),
                'endhour': datetime.combine(datetime.today(), event.endhour),
                'status': event.status,
                'userid': event.userid,
                'clientid': event.clientid,
                'patientid': event.patientid
            }
        )

    @staticmethod
    async def update(id: int, event: CreateEvent):
        await prisma_connection.prisma.events.update(
            where={
                'eventid': id
            },
            data={
                'title': event.title,
                'description': event.description,
                'type': event.type,
                'eventdate': datetime.combine(event.eventdate, datetime.min.time()),
                'starthour': datetime.combine(datetime.today(), event.starthour),
                'endhour': datetime.combine(datetime.today(), event.endhour),
                'status': event.status,
                'userid': event.userid,
                'clientid': event.clientid,
                'patientid': event.patientid
            }
        )

    @staticmethod
    async def delete(id: int):
        await prisma_connection.prisma.events.delete(
            where={'eventid': id}
        )

