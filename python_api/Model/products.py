from pydantic import BaseModel
from typing import Optional

class CreateProduct(BaseModel):
    name: str
    description: Optional[str] = None
    sellingprice: float
    cost: float
    tva: float
    quantity: int
    producttypeid: int

