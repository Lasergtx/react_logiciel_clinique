from pydantic import BaseModel
from typing import Optional
from datetime import date
from Customtypes import Statut

class CreateBoosterShot(BaseModel):
    type: str
    initialdate: date
    executiondate: Optional[date] = None
    status: Statut
    patientid: int