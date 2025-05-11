from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.events import EventsService
from Model.events import CreateEvent

router = APIRouter(
    prefix="/events",
    tags=["events"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_events():
    result = await EventsService.get_all()
    return ResponseSchema(detail="Successfully fetched all events", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_event_by_id(id: int = Path(..., alias="id")):
    result = await EventsService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched event data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_event(data: CreateEvent):
    result = await EventsService.create(data)
    return ResponseSchema(detail="Successfully created event", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_event(id: int = Path(..., alias="id"), *, data: CreateEvent):
    result = await EventsService.update(id, data)
    return ResponseSchema(detail="Successfully updated event", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_event(id: int = Path(..., alias="id")):
    result = await EventsService.delete(id)
    return ResponseSchema(detail="Successfully deleted event", result=result)