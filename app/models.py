from sqlalchemy import Column, Integer, String, CheckConstraint
from database import Base

class Menu(Base):
    __tablename__ = 'menu'

    id = Column(Integer, primary_key=True, index=True)
    dish_name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    dish_type = Column(String, nullable=False)
    price = Column(Integer, nullable=False)

    __table_args__ = (
        CheckConstraint(
            "dish_type IN ('veg', 'nonveg')",
            name="check_dish_type"
        ),
    )
