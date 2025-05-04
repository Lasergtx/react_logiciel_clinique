from pydantic import BaseModel
from Customtypes import Gender
from typing import Optional


class CreateClients(BaseModel):
    lastname: str
    firstname: str
    gender: Gender
    phonenumber: str
    email: Optional[str] = None
    address: Optional[str] = None
    zipcode: Optional[str] = None
    city: Optional[str] = None