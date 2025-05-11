from typing import Optional
from pydantic import BaseModel

class CreatePrescription(BaseModel):
    motive: Optional[str] = None
    prescriptionlink: str
    patientid: int