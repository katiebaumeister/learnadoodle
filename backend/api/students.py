from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from backend.db.connect import get_session
from backend.db.models import Students
from backend.auth.firebase_auth import require_parent

router = APIRouter()

@router.post("/add_student")
@require_parent()
def add_student(data: dict, family=Depends(), session: Session = Depends(get_session)):
    student = Students(**data, family_id=family.family_id)
    session.add(student)
    session.commit()
    return {"message": "Student added"}

@router.get("/get_students")
@require_parent()
def get_students(family=Depends(), session: Session = Depends(get_session)):
    students = session.exec(select(Students).where(Students.family_id == family.family_id)).all()
    return students
