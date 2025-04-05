@router.post("/seed_sample_data")
async def seed_sample_data(
    session: Session = Depends(get_session)
):
    family_id = 1  # ✅ Hardcoded for testing

    # Check if sample student already exists
    existing = session.query(Students).filter_by(family_id=family_id).first()
    if existing:
        return {"message": "Sample data already seeded."}

    # Create sample student
    student = Students(
        family_id=family_id,
        name="Sample Student",
        grade_base="4",
        age="9",
        learning_style="Visual",
        interests="Science, Art"
    )
    session.add(student)
    session.commit()
    session.refresh(student)

    # Create sample subject
    subject = Subjects(
        family_id=family_id,
        student_id=student.student_id,
        subject="Math",
        grade_subject="4th",
        objectives="Master fractions, multiplication tables",
        target_days=30
    )
    session.add(subject)

    # Create sample lesson
    lesson = Lessons(
        family_id=family_id,
        student_id=student.student_id,
        subject="Math",
        curriculum_day=1,
        unit="Fractions",
        lesson_overview="Intro to Fractions",
        lesson_detail="Half, quarter, and whole explained.",
        status="pending"
    )
    session.add(lesson)

    session.commit()
    return {"message": "Sample data seeded successfully."}
