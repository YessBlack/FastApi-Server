from sqlalchemy import Column, Integer, String, DateTime, func
from .database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(100), unique=True, nullable=False)
    user_password = Column(String(255), nullable=False)
    user_create_at = Column(DateTime, server_default=func.now())
