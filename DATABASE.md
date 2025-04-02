
---

### ✅ `DATABASE.md`

```markdown
# Learnadoodle Database Reference

This document outlines the structure and purpose of the database tables used in the Learnadoodle system.

---

## 🏠 family

| Column | Type | Description |
|--------|------|-------------|
| family_id | INTEGER | Primary key |
| name_parent | TEXT | Parent name |
| total_school_days | INTEGER | # of school days |
| total_school_hours | INTEGER | Optional hours-based tracking |
| vacation_days | JSON | List of dates off |
| academic_year_start | TEXT | Start date |
| academic_year_end | TEXT | Calculated by AI |
| weekend_schooling | TEXT | "none", "Saturdays", "Sundays", "both" |
| extra_days | TEXT | Optional buffer |
| daily_weekly | TEXT | Schedule format preference |
| setup_history | TEXT | Notes for onboarding/resuming |
| tweak_notes | TEXT | Parent tweaks |
| onboarding_status | TEXT | Workflow status |

---

## 👧 students

| Column | Type | Description |
|--------|------|-------------|
| student_id | INTEGER | Primary key |
| family_id | INTEGER | FK |
| name | TEXT | Student name |
| grade_base | TEXT | Grade |
| age | TEXT | Optional |
| grade_history | TEXT | Optional |
| learning_style | TEXT | e.g., "visual" |
| interests | TEXT | Comma-separated |
| document_upload | JSON | Optional files |
| next_year_plans | JSON | Future plans |

---

## 📅 student_calendar

| Column | Type | Description |
|--------|------|-------------|
| family_id | INTEGER | FK |
| student_id | INTEGER | FK |
| date | DATE | Calendar date |
| day_of_week | TEXT | Weekday name |
| is_school_day | BOOLEAN | True/False |
| curriculum_day | INTEGER | Counter |
| attended | NUMERIC | Attendance (0–1) |

---

## 📚 subjects

| Column | Type | Description |
|--------|------|-------------|
| family_id | INTEGER | FK |
| student_id | INTEGER | FK |
| subject | TEXT | Subject name |
| grade_subject | TEXT | Subject grade |
| objectives | TEXT | Goals summary |
| unit_boundaries | JSON | Units breakdown |
| schedule_pattern | TEXT | Schedule (e.g., "MTWRF") |
| target_days | INTEGER | Total lessons |
| days_generated | INTEGER | Counter |
| subject_objectives_raw | TEXT | Raw AI objectives |
| shared_group_id | INTEGER | Shared subject grouping |
| curriculum_image | JSON | Optional |
| curriculum_status | TEXT | Status |

---

## 📝 lessons

| Column | Type | Description |
|--------|------|-------------|
| lesson_id | INTEGER | PK |
| family_id | INTEGER | FK |
| student_id | INTEGER | FK |
| subject | TEXT | Subject |
| curriculum_day | INTEGER | Day |
| unit | TEXT | Curriculum unit |
| lesson_overview | TEXT | Short description |
| lesson_detail | TEXT | Long description |
| status | TEXT | "planned" / "completed" |
| progress_notes | TEXT | Parent notes |

---

## 🗒️ grades

| Column | Type | Description |
|--------|------|-------------|
| report_id | INTEGER | PK |
| family_id | INTEGER | FK |
| student_id | INTEGER | FK |
| subject | TEXT | Subject |
| period | TEXT | "Q1", "2024/25" |
| start_date | DATE | Period start |
| end_date | DATE | Period end |
| credits | NUMERIC | Credits earned |
| level | TEXT | "Elementary" / "High School" |
| grade | TEXT | "A", "Excellent" |
| grade_value | NUMERIC | GPA value |
| gpa | NUMERIC | Calculated GPA |
| notes | TEXT | Optional |
| template | TEXT | Markdown version |

---

## 🎓 transcripts

| Column | Type | Description |
|--------|------|-------------|
| transcript_id | INTEGER | PK |
| family_id | INTEGER | FK |
| student_id | INTEGER | FK |
| period | TEXT | Transcript range |
| start_date | DATE | Period start |
| end_date | DATE | Period end |
| cumulative_gpa | NUMERIC | GPA |
| total_credits | NUMERIC | Credits total |
| template | TEXT | Markdown summary |

---

## 📔 journal

| Column | Type | Description |
|--------|------|-------------|
| journal_id | INTEGER | PK |
| family_id | INTEGER | FK |
| student_id | INTEGER | FK |
| course_year | TEXT | e.g., "2025/26" |
| content | TEXT | Markdown journal |
| pdf_url | TEXT | Storage URL |
| created_at | TIMESTAMP | Generated automatically |
