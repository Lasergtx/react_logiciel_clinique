from pydantic import BaseModel
from Customtypes import Payment

class CreateEarning(BaseModel):
    amount: float
    description: str
    paymentstatus: Payment
    clientid: int