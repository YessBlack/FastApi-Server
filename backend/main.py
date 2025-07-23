from fastapi import FastAPI, Request, Form
from fastapi.middleware.cors import CORSMiddleware
import hashlib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VALID_PASSWORD = "123456siete"

def get_hashed_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_client_hash(client_hash: str) -> bool:
    expected_hash = get_hashed_password(VALID_PASSWORD)
    return client_hash == expected_hash

@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    if username == "admin" and verify_client_hash(password):
        return {"message": "Login exitoso"}
    return {"message": "Credenciales inválidas"}
