from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from backend.db.connect import get_session
from backend.db.models import Lessons
from backend.auth.firebase_auth import require_parent
from datetime import datetime, timedelta
import logging

router = APIRouter()

@router.post("/trigger_planner")
async def trigger_planner(
    family=Depends(require_parent),
    session: Session = Depends(get_session)
):
    try:
        logging.info("🔧 Trigger planner called")
        logging.info(f"🔐 Family from token: {family}")

        today = datetime.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        week_days = [start_of_week + timedelta(days=i) for i in range(7)]

        week_plan = {}
        for i, day in enumerate(week_days):
            lesson = session.exec(
                select(Lessons)
                .where(Lessons.family_id == family["family_id"])
                .where(Lessons.curriculum_day == i + 1)
            ).first()

            logging.info(f"📆 Day {day.strftime('%A')} → Lesson: {lesson.lesson_overview if lesson else 'None'}")

            week_plan[day.strftime('%A')] = {
                "lesson": lesson.lesson_overview if lesson else "No lesson"
            }

        return { "week_plan": week_plan }

    except Exception as e:
        logging.exception("🔥 Error in trigger_planner")
        return {"error": str(e)}
