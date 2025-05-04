from pydantic import BaseModel
from datetime import date, time
from Customtypes import Statut
from typing import Optional

class CreateEvent(BaseModel):
    title: str
    description: Optional[str] = None
    type: str
    eventdate: date
    starthour: time
    endhour: time
    status: Statut
    userid: int
    clientid: Optional[int] = None
    patientid: Optional[int] = None