from sqlalchemy import Column,Integer,String,Boolean
from database import Base

# Modèle User pour la table users
class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key = True, index = True)
    email = Column(String, unique = True , index = True)
    userName = Column(String, index = True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default = True) # false 