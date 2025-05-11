from pydantic import BaseModel
from typing import Optional

class CreateExpense(BaseModel):
    amount: float
    description: Optional[str] = None
