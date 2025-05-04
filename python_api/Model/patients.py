from pydantic import BaseModel
from Customtypes import Gender
from typing import Optional
from datetime import date

class CreatePatient(BaseModel):
    name: str
    gender: Gender
    type: str
    species: Optional[str] = None
    birthdate: Optional[date] = None
    numberid: Optional[int] = None
    color: Optional[str] = None
    clientid: int

