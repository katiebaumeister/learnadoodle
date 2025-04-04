from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from backend.db.connect import get_session
from backend.db.models import Grades, Transcripts
from backend.auth.firebase_auth import require_parent

router = APIRouter()

@router.get("/get_grades")
async def get_grades(
    family=Depends(require_parent),
    session: Session = Depends(get_session)
):
    grades = session.exec(
        select(Grades).where(Grades.family_id == family["family_id"])
    ).all()
    return grades

@router.get("/get_transcripts")
async def get_transcripts(
    family=Depends(require_parent),
    session: Session = Depends(get_session)
):
    transcripts = session.exec(
        select(Transcripts).where(Transcripts.family_id == family["family_id"])
    ).all()
    return transcripts
