from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import models
from database import get_db




# Congiguration JWT
SECRET_KEY = "your_secret_key"  # À changer en production! signature du token
ALGORITHM = "HS256"             # Algorithme de chiffrement
ACCESS_TOKEN_EXPIRE_MINUTE = 30 # Durée de validité du token

# Context pour le hashage des mots de passe
pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

# Hashed password → protège les mots de passe dans la base en transformant en code incomprehensible.
# Bearer token → sert à prouver ton identité après le login (authentification) em JWT.

# Scheme pour l'authentification OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "login") # indiques à FastAPI où le client doit aller chercher un token. donc L’utilisateur doit d’abord s’authentifier sur login pour obtenir un token JWT.

# Hash un mot de passe
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Vérifie si un mot de passe correspond au hash
def verify_password(plain_pwd: str, hashed_pwd: str) -> bool:
    return pwd_context.verify(plain_pwd, hashed_pwd)

# Crée un JWT token
def create_access_token(data: dict) -> str:
    to_encode= data.copy() #copie des données envoyées Pour ne pas modifier directement data reçu en argument.
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTE) #On calcule la date d’expiration du token
    to_encode.update({"exp": expire}) #nouvelle clé "exp" (expiration) ajouter dans le dictionnaire.
    return jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)

# Décode et vérifie un JWT token
def decode_token(token: str):
    try: #si tout va bien → un dict Python contenant les claims (ex: {"sub": "...", "exp": 169...}
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
# Obtient l'utilisateur courant à partir du token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    
    credentials_expression = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "Token invalide ou expire",
        headers = {"WWw-Authenticate": "Bearer"},
    )

# Décoder le token JWT
    payload = decode_token(token)
    if payload is None:
        raise credentials_expression
    
    email:str = payload.get("sub") #si tout va bien → un dict Python contenant les claims (ex: {"sub": "...", "exp": 169...}
    if email is None:
        raise credentials_expression
    
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_expression
    
    return user
