from pydantic import BaseModel, EmailStr
from typing import Optional

# Schéma pour la création d'utilisateur (inscription)
class UserCreate(BaseModel):
    userName: str
    email: EmailStr # Validation automatique du format email
    password: str  # Mot de passe en clair (sera hashé)

# Schéma pour la réponse API (sans mot de passe)
class UserOut(BaseModel):
    id: int
    email: EmailStr
    userName: str
    is_active: bool

    class Config():
        from_attributes = True # Permet la conversion ORM -> Pydantic

# Schéma pour la réponse du login (contient le token)
class Token(BaseModel):
    access_token: str  #JWT(JSON Web Token) token pour l'authentification
    token_type: str = "bearer" # Type de token (bearer)

# Schéma pour la requête de login
class LoginRequest(BaseModel):
    email: EmailStr
    password: str