import openai
import os
from fastapi import HTTPException
from db.connect import cursor, conn
from utils.helpers import get_snapshot

openai.api_key = os.getenv("OPENAI_API_KEY")

agent_registry = {}

def ai_agent(agent_name):
    def decorator(func):
        agent_registry[agent_name] = func
        return func
    return decorator

async def handle_ai_flow(agent_name: str, data: dict):
    if agent_name not in agent_registry:
        raise HTTPException(status_code=404, detail=f"Agent '{agent_name}' not found")

    snapshot = await get_snapshot(data.get("family_id"))
    return await agent_registry[agent_name](data, snapshot)

@app.get("/api/joy_corner")
def joy_corner(family_id: int):
    # Eventually hook this into AI
    fun_activities = [
        "Outdoor scavenger hunt 🐾",
        "Build a baking soda volcano 🌋",
        "Local museum visit 🎨",
        "Nature journal sketching 🍃",
        "Family science trivia night 🧪"
    ]
    return {"activities": fun_activities}

@app.get("/api/get_records")
def get_records(family_id: int):
    with Session(engine) as session:
        records = session.exec(
            select(Journal).where(Journal.family_id == family_id)
        ).all()
        return {"records": [
            {
                "record_id": r.journal_id,
                "title": f"Journal {r.course_year}",
                "description": r.course_year,
                "pdf_url": r.pdf_url
            }
            for r in records
        ]}

