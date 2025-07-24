from fastapi import FastAPI, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import models
from .auth import verify_password, get_hashed_password

app = FastAPI()

# Middleware CORS (igual que antes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear tablas si no existen (opcional)
models.Base.metadata.create_all(bind=engine)

# Dependencia para obtener conexión a la DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint /login
@app.post("/login")
async def login(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.user_email == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")

    if not verify_password(password, user.user_password):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    return {"message": "Login exitoso", "data": user}

@app.post("/register")
async def register(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.user_email == username).first()
    if user:
        raise HTTPException(status_code=400, detail="Usuario ya existe")

    # Hash de la contraseña
    hashed_password = get_hashed_password(password)

    user = models.User(user_email=username, user_password=hashed_password)
    db.add(user)
    db.commit()
    return {"message": "Usuario registrado exitosamente", "data": user, "status": 201}
