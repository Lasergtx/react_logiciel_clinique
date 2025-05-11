from pydantic import BaseModel
from typing import Optional

class CreateAllergy(BaseModel):
    name: str
    description: Optional[str] = None