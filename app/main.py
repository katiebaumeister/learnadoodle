from fastapi import FastAPI, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from orchestrator import handle_ai_flow, ai_agent
from db.connect import conn, cursor
from utils.helpers import get_snapshot
from auth.firebase_auth import verify_token
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Learnadoodle AI backend is online"}

@app.post("/api/fetch_snapshot")
async def fetch_snapshot(data: dict = Body(...), user=Depends(verify_token)):
    family_id = data.get("family_id")
    return await get_snapshot(family_id)

@app.post("/api/trigger_planner")
async def trigger_planner(data: dict = Body(...), user=Depends(verify_token)):
    return await handle_ai_flow("planner", data)

@app.post("/api/add_student")
async def add_student(data: dict = Body(...), user=Depends(verify_token)):
    cursor.execute("INSERT INTO students (family_id, name) VALUES (?, ?)", (data["family_id"], data["name"]))
    conn.commit()
    return {"message": f"Student {data['name']} added."}

@app.post("/api/remove_student")
async def remove_student(data: dict = Body(...), user=Depends(verify_token)):
    cursor.execute("DELETE FROM students WHERE student_id = ?", (data["student_id"],))
    conn.commit()
    return {"message": "Student removed."}

@app.post("/api/update_student")
async def update_student(data: dict = Body(...), user=Depends(verify_token)):
    cursor.execute("UPDATE students SET name = ? WHERE student_id = ?", (data["name"], data["student_id"]))
    conn.commit()
    return {"message": "Student updated."}

@app.post("/api/update_family")
async def update_family(data: dict = Body(...), user=Depends(verify_token)):
    cursor.execute("UPDATE family SET name_parent = ? WHERE family_id = ?", (data["name_parent"], data["family_id"]))
    conn.commit()
    return {"message": "Family updated."}
