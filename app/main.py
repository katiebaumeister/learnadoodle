# ✅ main.py — Full Learnadoodle FastAPI Backend Entry
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.db.connect import engine
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from backend.db.connect import engine
from backend.db.models import Students, Subjects, Lessons, Family
from backend.auth.firebase_auth import require_parent

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Healthcheck
@app.get("/healthcheck")
async def healthcheck():
    return {"status": "ok"}

# ✅ Update Subject Objective
@app.post("/api/update_subject_objective")
@require_parent()
async def update_subject_objective(data: dict, family, decoded_token):
    student_name = data["student"]
    subject_name = data["subject"]
    new_objectives = data["objectives"]

    with Session(engine) as session:
        student = session.exec(
            select(Students).where(
                Students.family_id == family.family_id,
                Students.name == student_name
            )
        ).first()
        if not student:
            raise HTTPException(404, "Student not found")

        subject = session.exec(
            select(Subjects).where(
                Subjects.student_id == student.student_id,
                Subjects.subject == subject_name
            )
        ).first()
        if not subject:
            raise HTTPException(404, "Subject not found")

        subject.subject_objectives_raw = new_objectives
        session.add(subject)
        session.commit()

    return {"message": "Objectives updated"}

# ✅ Get Curriculum and Journal Combined
@app.get("/api/get_curriculum_and_journal")
@require_parent()
async def get_curriculum_and_journal(family, decoded_token):
    with Session(engine) as session:
        students = session.exec(
            select(Students).where(Students.family_id == family.family_id)
        ).all()

        output = []
        for student in students:
            subjects = session.exec(
                select(Subjects).where(
                    Subjects.family_id == family.family_id,
                    Subjects.student_id == student.student_id
                )
            ).all()

            lessons = session.exec(
                select(Lessons).where(
                    Lessons.family_id == family.family_id,
                    Lessons.student_id == student.student_id
                )
            ).all()

            journal = {}
            for lesson in lessons:
                subject = lesson.subject
                week = f"Week {lesson.curriculum_day // 5 + 1}"
                journal.setdefault(subject, {}).setdefault(week, []).append(
                    lesson.lesson_overview
                )

            output.append({
                "student": student.name,
                "grade": student.grade_base,
                "subjects": [{
                    "subject": s.subject,
                    "objectives": s.subject_objectives_raw,
                    "units": s.unit_boundaries or []
                } for s in subjects],
                "journal": journal,
            })

    return {
        "family": family.name_parent,
        "academic_year": f"{family.academic_year_start} – {family.academic_year_end}",
        "students": output
    }
