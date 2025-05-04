from pydantic import BaseModel
from Customtypes import Payment
from typing import Optional

class CreateEarning(BaseModel):
    amount: float
    description: Optional[str] = None
    paymentstatus: Payment
    clientid: int