from sqlmodel import create_engine, Session

# ✅ Local SQLite file
DATABASE_URL = "sqlite:///./database.db"

# ✅ Required for SQLite threading in FastAPI
connect_args = {"check_same_thread": False}

# ✅ Create engine
engine = create_engine(DATABASE_URL, connect_args=connect_args)

# ✅ Return session
def get_session():
    return Session(engine)
