from pydantic import BaseModel

class CreateItem(BaseModel):
    productid: int
    quantity: int