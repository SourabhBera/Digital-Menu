from fastapi import Depends, FastAPI, HTTPException, status
import schemas as schemas
from models import Base
from database import engine, SessionLocal
from sqlalchemy.orm import Session 
import models

app = FastAPI()

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()


@app.get("/")
def root(db:Session = Depends(get_db)):
    menu = db.query(models.Menu).all()
    return menu


@app.post("/add-item")
def add_item(request:schemas.AddMenu, db:Session = Depends(get_db)):
    new_item = models.Menu(dish_name=request.dish_name, category=request.category, dish_type=request.dish_type, price=request.price)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return {"message":f"Item added in menu with id {request.dish_name}."}



@app.put("/update/{id}")
def update_item(id: int, request: schemas.AddMenu, db: Session = Depends(get_db)):

    item_query = db.query(models.Menu).filter(models.Menu.id == id)
    item = item_query.first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Menu with item id {id} not found.")
    
    update_data = request.dict(exclude_unset=True)
    item_query.update(update_data, synchronize_session=False)
    db.commit()
    
    return {"message": f"Item with id {id} updated successfully."}


@app.delete("/delete/{id}")
def delete_item(id, db:Session = Depends(get_db)):
    db.query(models.Menu).filter(models.Menu.id == id).delete(synchronize_session=False)
    db.commit()
    return {"message":f"Item deleted with id {id}."}
