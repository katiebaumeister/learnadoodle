# create_db.py
from sqlmodel import SQLModel
from backend.db.connect import engine

# 👇 Import your models to register them with SQLModel
import backend.db.models  # this is important!

def generate_schema():
    print("⏳ Creating database schema...")
    SQLModel.metadata.create_all(engine)
    print("✅ Database schema created successfully.")

if __name__ == "__main__":
    generate_schema()
