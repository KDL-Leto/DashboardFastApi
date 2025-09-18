from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Annotated
import models
from database import engine, get_db
from schemas import UserCreate, UserOut, LoginRequest, Token
from auth import hash_password, verify_password, create_access_token, get_current_user
import uvicorn

# Création de l'application FastAPI
app = FastAPI(title = "Auth API", version = "1.0.0")

origins = ['http://localhost:5173']

# Configuration CORS pour autoriser le frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,  # URL du frontend React
    allow_credentials=True,
    allow_methods=["*"], # Permet toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],
    expose_headers=["*"], # Expose tous les headers
)

# Création des tables au démarrage
models.Base.metadata.create_all(bind = engine)

# Dépendance pour l'injection de session
db_dependency = Annotated[Session, Depends(get_db)]

# Route pour l'inscription
@app.post("/register", response_model = UserOut, status_code = status.HTTP_201_CREATED)
async def register(user: UserCreate, db: db_dependency):

    # Vérifie si l'email existe déjà
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail = 'Email deja utilisee'
        )

    # Crée un nouvel utilisateur avec mot de passe hashé
    hashed_password = hash_password(user.password)
    db_user = models.User(email = user.email, hashed_password = hashed_password, userName = user.userName)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

# Route pour le login
@app.post('/login', response_model = Token)
async def login(login_data: LoginRequest, db: db_dependency):

    # Recherche l'utilisateur par email
    user = db.query(models.User).filter(models.User.email == login_data.email).first()

    # Vérifie si l'utilisateur existe et le mot de passe
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Crée le token JWT
    access_token = create_access_token(data = {"sub":user.email})

    return{"access_token": access_token, "type_token":"bearer"}


# Route protégée - Profile utilisateur
@app.get('/dashboard')
async def get_profile(current_user : UserOut = Depends(get_current_user)):
    return {
            "message": {f"Bienvenue {current_user.userName}!"},

            "user": {
                "email": current_user.email,
                "userName": current_user.userName,
                "is_active": current_user.is_active
            },
            "stats": {
                "messages":3 ,
                "total": 15,
                "completed": 7
            },
            "activities": [
                {"id": 1, "action": "Connexion", "time": "10:30"},
                {"id": 2, "action": "Mise à jour du profil", "time": "11:45"}
            ]
    }
   
    

# # Route protégée - Dashboard data
# @app.get('/dashboard_data')
# async def get_dashboard_data(current_user: UserOut = Depends(get_current_user)):
#     # Données fictives pour le dashboard
#     return {
#         "welcome message": f"Welcome{current_user.userName}!"
#     }