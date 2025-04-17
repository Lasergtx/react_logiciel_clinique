from pydantic import BaseModel

class CreateItemSold(BaseModel):
    productid: int
    quantity: int