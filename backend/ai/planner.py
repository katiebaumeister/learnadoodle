from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from backend.db.connect import get_session
from backend.db.models import StudentCalendar, Lessons
from backend.auth.firebase_auth import require_parent
from datetime import datetime, timedelta
import logging

# Setup logger
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

router = APIRouter()

@router.post("/trigger_planner")
async def trigger_planner(
    family=Depends(require_parent),
    session: Session = Depends(get_session)
):
    try:
        today = datetime.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        week_days = [start_of_week + timedelta(days=i) for i in range(7)]

        logger.info(f"Triggering planner for family: {family}")

        week_plan = {}
        for i, day in enumerate(week_days):
            lesson = session.exec(
                select(Lessons)
                .where(Lessons.family_id == family["family_id"])
                .where(Lessons.curriculum_day == i + 1)
            ).first()

            logger.info(f"{day.strftime('%A')} - Found lesson: {lesson.lesson_overview if lesson else 'None'}")

            week_plan[day.strftime('%A')] = {
                "lesson": lesson.lesson_overview if lesson else "No lesson"
            }

        return { "week_plan": week_plan }

    except Exception as e:
        logger.error(f"Error in /trigger_planner: {e}")
        return { "error": str(e) }
