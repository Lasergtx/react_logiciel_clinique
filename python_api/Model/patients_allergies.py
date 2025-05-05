from pydantic import BaseModel
from Customtypes import Status

class CreatePA(BaseModel):
    patientid: int
    allergyid: int
    status: Status