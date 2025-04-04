from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from backend.db.connect import get_session
from backend.db.models import StudentCalendar
from backend.auth.firebase_auth import require_parent

router = APIRouter()

@router.get("/get_calendar")
async def get_calendar(
    family=Depends(require_parent),
    session: Session = Depends(get_session)
):
    entries = session.exec(
        select(StudentCalendar).where(StudentCalendar.family_id == family["family_id"])
    ).all()
    return entries
