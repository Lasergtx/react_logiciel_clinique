from pydantic import BaseModel

class CreateProduct(BaseModel):
    name: str
    description: str
    sellingprice: float
    cost: float
    tva: float
    quantity: int
    producttypeid: int

