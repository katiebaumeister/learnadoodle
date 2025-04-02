from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import openai
import os
import json
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
import sqlite3

app = FastAPI()

# Load API keys
openai.api_key = os.getenv("OPENAI_API_KEY")
GOOGLE_CLIENT_SECRET_FILE = "client_secret.json"
SCOPES = ["https://www.googleapis.com/auth/calendar"]
REDIRECT_URI = "http://localhost:8000/oauth2callback"

# ----------------- DATABASE -----------------
conn = sqlite3.connect("learnadoodle.db", check_same_thread=False)
cursor = conn.cursor()

# Create all required tables for orchestration
cursor.executescript('''
    CREATE TABLE IF NOT EXISTS family (
        family_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_parent TEXT DEFAULT NULL,
        total_school_days INTEGER DEFAULT NULL,
        total_school_hours INTEGER DEFAULT NULL,
        vacation_days TEXT DEFAULT NULL,
        academic_year_start TEXT DEFAULT NULL,
        academic_year_end TEXT DEFAULT NULL,
        weekend_schooling TEXT DEFAULT NULL,
        extra_days TEXT DEFAULT NULL,
        daily_weekly TEXT DEFAULT NULL,
        setup_history TEXT DEFAULT NULL,
        tweak_notes TEXT DEFAULT NULL,
        onboarding_status TEXT DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS students (
        student_id INTEGER PRIMARY KEY AUTOINCREMENT,
        family_id INTEGER,
        name TEXT DEFAULT NULL,
        grade_base TEXT DEFAULT NULL,
        age TEXT DEFAULT NULL,
        grade_history TEXT DEFAULT NULL,
        learning_style TEXT DEFAULT NULL,
        interests TEXT DEFAULT NULL,
        document_upload TEXT DEFAULT NULL,
        next_year_plans TEXT DEFAULT NULL,
        FOREIGN KEY (family_id) REFERENCES family(family_id)
    );

    CREATE TABLE IF NOT EXISTS student_calendar (
        family_id INTEGER,
        student_id INTEGER,
        date TEXT,
        day_of_week TEXT DEFAULT NULL,
        is_school_day BOOLEAN DEFAULT NULL,
        curriculum_day INTEGER DEFAULT NULL,
        attended NUMERIC DEFAULT NULL,
        PRIMARY KEY (family_id, student_id, date),
        FOREIGN KEY (family_id) REFERENCES family(family_id),
        FOREIGN KEY (student_id) REFERENCES students(student_id)
    );

    CREATE TABLE IF NOT EXISTS subjects (
        family_id INTEGER,
        student_id INTEGER,
        subject TEXT,
        grade_subject TEXT DEFAULT NULL,
        objectives TEXT DEFAULT NULL,
        unit_boundaries TEXT DEFAULT NULL,
        schedule_pattern TEXT DEFAULT NULL,
        target_days INTEGER DEFAULT NULL,
        days_generated INTEGER DEFAULT NULL,
        subject_objectives_raw TEXT DEFAULT NULL,
        shared_group_id INTEGER DEFAULT NULL,
        curriculum_image TEXT DEFAULT NULL,
        curriculum_status TEXT DEFAULT NULL,
        PRIMARY KEY (family_id, student_id, subject),
        FOREIGN KEY (family_id) REFERENCES family(family_id),
        FOREIGN KEY (student_id) REFERENCES students(student_id)
    );

    CREATE TABLE IF NOT EXISTS lessons (
        lesson_id INTEGER PRIMARY KEY AUTOINCREMENT,
        family_id INTEGER,
        student_id INTEGER,
        subject TEXT DEFAULT NULL,
        curriculum_day INTEGER DEFAULT NULL,
        unit TEXT DEFAULT NULL,
        lesson_overview TEXT DEFAULT NULL,
        lesson_detail TEXT DEFAULT NULL,
        status TEXT DEFAULT NULL,
        progress_notes TEXT DEFAULT NULL,
        FOREIGN KEY (family_id) REFERENCES family(family_id),
        FOREIGN KEY (student_id) REFERENCES students(student_id)
    );

    CREATE TABLE IF NOT EXISTS grades (
        report_id INTEGER PRIMARY KEY AUTOINCREMENT,
        family_id INTEGER,
        student_id INTEGER,
        subject TEXT DEFAULT NULL,
        period TEXT DEFAULT NULL,
        start_date TEXT DEFAULT NULL,
        end_date TEXT DEFAULT NULL,
        credits NUMERIC DEFAULT NULL,
        level TEXT DEFAULT NULL,
        grade TEXT DEFAULT NULL,
        grade_value NUMERIC DEFAULT NULL,
        gpa NUMERIC DEFAULT NULL,
        notes TEXT DEFAULT NULL,
        template TEXT DEFAULT NULL,
        FOREIGN KEY (family_id) REFERENCES family(family_id),
        FOREIGN KEY (student_id) REFERENCES students(student_id)
    );

    CREATE TABLE IF NOT EXISTS transcripts (
        transcript_id INTEGER PRIMARY KEY AUTOINCREMENT,
        family_id INTEGER,
        student_id INTEGER,
        period TEXT DEFAULT NULL,
        start_date TEXT DEFAULT NULL,
        end_date TEXT DEFAULT NULL,
        cumulative_gpa NUMERIC DEFAULT NULL,
        total_credits NUMERIC DEFAULT NULL,
        template TEXT DEFAULT NULL,
        FOREIGN KEY (family_id) REFERENCES family(family_id),
        FOREIGN KEY (student_id) REFERENCES students(student_id)
    );

    CREATE TABLE IF NOT EXISTS journal (
        journal_id INTEGER PRIMARY KEY AUTOINCREMENT,
        family_id INTEGER,
        student_id INTEGER,
        course_year TEXT DEFAULT NULL,
        content TEXT DEFAULT NULL,
        pdf_url TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (family_id) REFERENCES family(family_id),
        FOREIGN KEY (student_id) REFERENCES students(student_id)
    );
''')

conn.commit()

# ----------------- MODELS -----------------
class OnboardingInput(BaseModel):
    user_id: int
    message: str

class UpdateScheduleInput(BaseModel):
    user_id: int
    week_of: str
    schedule: list

# ----------------- ROUTES -----------------

# Default homepage route
@app.get("/")
def read_root():
    return {"message": "Welcome to Learnadoodle! AI-Powered Homeschool Calendar"}

# ----------------- ONBOARDING AI -----------------
@app.post("/ai/onboarding")
async def onboarding_ai(input: OnboardingInput):
    # Dummy profile for testing, will be dynamic later
    profile = {"age": 8, "interests": ["space", "art"]}

    messages = [
        {
            "role": "system",
            "content": "You are the Onboarding AI. Your job is to set up the family, students, and draft student_calendar and subjects tables."
        },
        {
            "role": "user",
            "content": input.message
        }
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=messages,
            temperature=0.5
        )
        reply = response['choices'][0]['message']['content']
        return {"reply": reply}
    except Exception as e:
        return {"error": str(e)}

# ----------------- GOOGLE AUTH -----------------
@app.get("/auth/google")
async def login_with_google():
    flow = Flow.from_client_secrets_file(
        GOOGLE_CLIENT_SECRET_FILE,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI
    )
    auth_url, _ = flow.authorization_url(prompt='consent')
    return RedirectResponse(auth_url)

@app.get("/oauth2callback")
async def google_callback(request: Request):
    flow = Flow.from_client_secrets_file(
        GOOGLE_CLIENT_SECRET_FILE,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI
    )

    flow.fetch_token(authorization_response=str(request.url))
    credentials = flow.credentials

    token_data = {
        "token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": credentials.client_id,
        "client_secret": credentials.client_secret,
        "scopes": credentials.scopes
    }

    return {"message": "Login successful", "token_data": token_data}

# ----------------- UTIL -----------------
def add_event_to_calendar(user_token, subject_name, subject_time, date_str):
    creds = Credentials(token=user_token)
    service = build('calendar', 'v3', credentials=creds)

    event = {
        'summary': subject_name,
        'start': {
            'dateTime': f'{date_str}T{subject_time[:5]}:00',
            'timeZone': 'America/New_York',
        },
        'end': {
            'dateTime': f'{date_str}T{subject_time[6:]}:00',
            'timeZone': 'America/New_York',
        }
    }

    event = service.events().insert(calendarId='primary', body=event).execute()
    return event.get('htmlLink')
