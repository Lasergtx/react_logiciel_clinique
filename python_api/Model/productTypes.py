from pydantic import BaseModel

class CreateProductType(BaseModel):
    name: str

class RetrieveProductType(BaseModel):
    producttypeid: int
    name: str

