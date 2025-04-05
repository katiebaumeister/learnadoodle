from fastapi import APIRouter, Depends
from sqlmodel import Session
from backend.db.connect import get_session
from backend.db.models import Family

router = APIRouter()

@router.post("/dev/create_test_family")
def create_test_family(session: Session = Depends(get_session)):
    new_family = Family(email="test@example.com")
    session.add(new_family)
    session.commit()
    session.refresh(new_family)
    return {"family_id": new_family.family_id, "email": new_family.email}
