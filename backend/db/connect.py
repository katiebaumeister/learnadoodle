import sqlite3
conn = sqlite3.connect('learnadoodle.db', check_same_thread=False)
cursor = conn.cursor()
