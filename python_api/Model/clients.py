from pydantic import BaseModel

class CreateClients(BaseModel):
    lastname: str
    firstname: str
    gender: str
    phonenumber: str
    email: str
    address: str
    zipcode: str
    city: str