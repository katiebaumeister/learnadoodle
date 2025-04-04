from sqlmodel import SQLModel, Field, Column, JSON
from typing import Optional
from datetime import date


# ✅ Family Table
class Family(SQLModel, table=True):
    family_id: Optional[int] = Field(default=None, primary_key=True)
    name_parent: Optional[str]
    total_school_days: Optional[int]
    total_school_hours: Optional[int]
    vacation_days: Optional[list] = Field(default=None, sa_column=Column(JSON))
    academic_year_start: Optional[str]
    academic_year_end: Optional[str]
    weekend_schooling: Optional[str]
    extra_days: Optional[str]
    daily_weekly: Optional[str]
    setup_history: Optional[str]
    tweak_notes: Optional[str]
    onboarding_status: Optional[str]


# ✅ Students Table
class Students(SQLModel, table=True):
    student_id: Optional[int] = Field(default=None, primary_key=True)
    family_id: Optional[int] = Field(foreign_key="family.family_id")
    name: Optional[str]
    grade_base: Optional[str]
    age: Optional[str]
    grade_history: Optional[str]
    learning_style: Optional[str]
    interests: Optional[str]
    document_upload: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    next_year_plans: Optional[dict] = Field(default=None, sa_column=Column(JSON))


# ✅ Student Calendar Table
class StudentCalendar(SQLModel, table=True):
    family_id: Optional[int] = Field(foreign_key="family.family_id", primary_key=True)
    student_id: Optional[int] = Field(foreign_key="students.student_id", primary_key=True)
    calendar_date: date = Field(primary_key=True)
    day_of_week: Optional[str]
    is_school_day: Optional[bool]
    curriculum_day: Optional[int]
    attended: Optional[float]


# ✅ Subjects Table
class Subjects(SQLModel, table=True):
    family_id: Optional[int] = Field(foreign_key="family.family_id", primary_key=True)
    student_id: Optional[int] = Field(foreign_key="students.student_id", primary_key=True)
    subject: str = Field(primary_key=True)
    grade_subject: Optional[str]
    objectives: Optional[str]
    unit_boundaries: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    schedule_pattern: Optional[str]
    target_days: Optional[int]
    days_generated: Optional[int]
    subject_objectives_raw: Optional[str]
    shared_group_id: Optional[int]
    curriculum_image: Optional[dict] = Field(default=None, sa_column=Column(JSON))
    curriculum_status: Optional[str]


# ✅ Lessons Table
class Lessons(SQLModel, table=True):
    lesson_id: Optional[int] = Field(default=None, primary_key=True)
    family_id: Optional[int] = Field(foreign_key="family.family_id")
    student_id: Optional[int] = Field(foreign_key="students.student_id")
    subject: str
    curriculum_day: Optional[int]
    unit: Optional[str]
    lesson_overview: Optional[str]
    lesson_detail: Optional[str]
    status: Optional[str]
    progress_notes: Optional[str]


# ✅ Grades Table
class Grades(SQLModel, table=True):
    report_id: Optional[int] = Field(default=None, primary_key=True)
    family_id: Optional[int] = Field(foreign_key="family.family_id")
    student_id: Optional[int] = Field(foreign_key="students.student_id")
    subject: str
    period: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    credits: Optional[float]
    level: Optional[str]
    grade: Optional[str]
    grade_value: Optional[float]
    gpa: Optional[float]
    notes: Optional[str]
    template: Optional[str]


# ✅ Transcripts Table
class Transcripts(SQLModel, table=True):
    transcript_id: Optional[int] = Field(default=None, primary_key=True)
    family_id: Optional[int] = Field(foreign_key="family.family_id")
    student_id: Optional[int] = Field(foreign_key="students.student_id")
    period: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    cumulative_gpa: Optional[float]
    total_credits: Optional[float]
    template: Optional[str]


# ✅ Journal Table
class Journal(SQLModel, table=True):
    journal_id: Optional[int] = Field(default=None, primary_key=True)
    family_id: Optional[int] = Field(foreign_key="family.family_id")
    student_id: Optional[int] = Field(foreign_key="students.student_id")
    course_year: Optional[str]
    content: Optional[str]  # Markdown content
    pdf_url: Optional[str]
