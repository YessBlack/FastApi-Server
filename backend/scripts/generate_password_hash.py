from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

password = "123456siete"
hash = pwd_context.hash(password)

print(f"Contraseña original: {password}")
print(f"Hash bcrypt: {hash}")
