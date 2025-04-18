from pydantic import BaseModel

class CreateInvoice(BaseModel):
    amount: float
    invoicelink: str
    clientid: int
    earningid: int