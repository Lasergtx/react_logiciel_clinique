from pydantic import BaseModel

class CreateExpense(BaseModel):
    amount: float
    description: str
