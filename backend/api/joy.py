from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from backend.db.connect import get_session
from backend.db.models import Journal
from backend.auth.firebase_auth import require_parent

router = APIRouter()

@router.get("/get_journal")
async def get_journal(
    family=Depends(require_parent),
    session: Session = Depends(get_session)
):
    journal = session.exec(
        select(Journal).where(Journal.family_id == family["family_id"])
    ).all()
    return journal
