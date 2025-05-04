from fastapi import APIRouter, Path
from schema import ResponseSchema
from Service.boostershots import BoosterShotsService
from Model.boostershots import CreateBoosterShot

router = APIRouter(
    prefix="/booster_shots",
    tags=["booster_shots"]
)

@router.get("", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_booster_shots():
    result = await BoosterShotsService.get_all()
    return ResponseSchema(detail="Successfully fetched all booster shots", result=result)

@router.get("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_booster_shot_by_id(id: int = Path(..., alias="id")):
    result = await BoosterShotsService.get_by_id(id)
    return ResponseSchema(detail="Successfully fetched booster shot data", result=result)

@router.post("", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_booster_shot(data: CreateBoosterShot):
    result = await BoosterShotsService.create(data)
    return ResponseSchema(detail="Successfully created booster shot", result=result)

@router.patch("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_booster_shot(id: int = Path(..., alias="id"), *, data: CreateBoosterShot):
    result = await BoosterShotsService.update(id, data)
    return ResponseSchema(detail="Successfully updated booster shot", result=result)

@router.delete("/{id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete_booster_shot(id: int = Path(..., alias="id")):
    result = await BoosterShotsService.delete(id)
    return ResponseSchema(detail="Successfully deleted booster shot", result=result)