from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker 
from sqlalchemy.ext.declarative import declarative_base


# URL de connexion à la base SQLite
DATABASE_URL = 'sqlite:///./users.db'

# Création du moteur de base de données
engine = create_engine(DATABASE_URL, connect_args = {"check_same_thread": False})

# Factory pour créer des sessions de base de données
SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)

#  Base class pour tous les modèles
Base = declarative_base()

# Dépendance pour injecter la session dans les routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()