import sqlite3
conn = sqlite3.connect('learnadoodle.db', check_same_thread=False)
cursor = conn.cursor()
from sqlmodel import create_engine
engine = create_engine("sqlite:///database.db")  # or use Postgres for production
