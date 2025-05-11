from Model.events import CreateEvent
from Repository.events import EventsRepository

class EventsService:

    @staticmethod
    async def get_all():
        return await EventsRepository.get_all()

    @staticmethod
    async def get_by_id(event_id: int):
        return await EventsRepository.get_by_id(event_id)

    @staticmethod
    async def create(event: CreateEvent):
        return await EventsRepository.create(event)

    @staticmethod
    async def update(event_id: int, event: CreateEvent):
        return await EventsRepository.update(event_id, event)

    @staticmethod
    async def delete(event_id: int):
        return await EventsRepository.delete(event_id)