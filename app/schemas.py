from pydantic import BaseModel, field_validator
from typing import Literal

class AddMenu(BaseModel):
    dish_name: str
    category: str
    dish_type: Literal['veg', 'nonveg']  
    price: int

    @field_validator('price')
    def validate_price(cls, value):
        if value <= 0:
            raise ValueError("Price must be a positive integer.")
        return value

