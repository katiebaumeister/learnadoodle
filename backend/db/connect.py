import os
from sqlmodel import create_engine

# ✅ Use DATABASE_URL from .env if available (Render or Postgres)
DATABASE_URL = os.getenv("DATABASE_URL")

# ✅ Fallback to local SQLite if not provided
if not DATABASE_URL:
    DATABASE_URL = "sqlite:///database.db"
    connect_args = {"check_same_thread": False}
else:
    connect_args = {}

# ✅ Create the SQLModel engine
engine = create_engine(DATABASE_URL, connect_args=connect_args)
