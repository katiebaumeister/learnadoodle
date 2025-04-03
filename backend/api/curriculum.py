from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from backend.db.connect import get_session
from backend.db.models import Students, Subjects, Lessons
from backend.auth.firebase_auth import require_parent

router = APIRouter()

@router.get("/get_curriculum_and_journal")
@require_parent()
def get_curriculum_and_journal(family=Depends(), session: Session = Depends(get_session)):
    students = session.exec(select(Students).where(Students.family_id == family.family_id)).all()
    result = []
    for student in students:
        subjects = session.exec(select(Subjects).where(Subjects.student_id == student.student_id)).all()
        lessons = session.exec(select(Lessons).where(Lessons.student_id == student.student_id)).all()
        journal = {}
        for lesson in lessons:
            week = f"Week {lesson.curriculum_day // 5 + 1}"
            journal.setdefault(lesson.subject, {}).setdefault(week, []).append(lesson.lesson_overview)
        result.append({
            "student": student.name,
            "grade": student.grade_base,
            "subjects": [{
                "subject": s.subject,
                "objectives": s.subject_objectives_raw,
                "units": s.unit_boundaries
            } for s in subjects],
            "journal": journal
        })
    return {"family": family.name_parent, "students": result}
