from pydantic import BaseModel

class CreateProductType(BaseModel):
    name: str


