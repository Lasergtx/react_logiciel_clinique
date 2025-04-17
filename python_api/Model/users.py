from pydantic import BaseModel
from Customtypes import Role

class CreateUser(BaseModel):
    username: str
    password: str
    role: Role
