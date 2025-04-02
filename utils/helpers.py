from db.connect import cursor

async def get_snapshot(family_id: int):
    snapshot = {}
    for table in ["family", "students", "subjects", "student_calendar", "lessons"]:
        res = cursor.execute(f"SELECT * FROM {table} WHERE family_id = ?", (family_id,)).fetchall()
        snapshot[table] = [dict(zip([col[0] for col in cursor.description], row)) for row in res]
    return snapshot
