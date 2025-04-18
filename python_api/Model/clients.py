from pydantic import BaseModel
from Customtypes import Gender


class CreateClients(BaseModel):
    lastname: str
    firstname: str
    gender: Gender
    phonenumber: str
    email: str
    address: str
    zipcode: str
    city: str