from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import hashlib

app = FastAPI()

# Directorio de plantillas
templates = Jinja2Templates(directory="templates")

def verify(password, hashed):
    return hashlib.sha256(password.encode()).hexdigest() == hashed

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Ruta GET para mostrar el formulario de login
@app.get("/login", response_class=HTMLResponse)
async def get_login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

# Ruta POST para recibir los datos del login
@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if username == "admin" and verify(password, hashed_password):
        return {"message": "Login exitoso"}
    return {"message": "Credenciales inválidas"}
