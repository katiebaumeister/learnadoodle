from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from backend.db.connect import get_session
from backend.db.models import Students
from backend.auth.firebase_auth import require_parent

router = APIRouter()

@router.get("/get_students")
async def get_students(
    family=Depends(require_parent),
    session: Session = Depends(get_session)
):
    students = session.exec(
        select(Students).where(Students.family_id == family["family_id"])
    ).all()
    return students
