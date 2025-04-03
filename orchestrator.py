from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.ai import onboarding, planner, builder, validator, lesson_ai, fun_ai, journal_ai, report_ai
from backend.auth import firebase_auth
from backend.db import connect
from backend.utils import helpers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Learnadoodle API is running"}

@app.get("/healthcheck")
def healthcheck():
    return {"status": "healthy"}

# -----------------------------
# ✅ import AI routes here
# -----------------------------

app.include_router(onboarding.router, prefix="/ai")
app.include_router(planner.router, prefix="/ai")
app.include_router(builder.router, prefix="/ai")
app.include_router(validator.router, prefix="/ai")
app.include_router(lesson_ai.router, prefix="/ai")
app.include_router(fun_ai.router, prefix="/ai")
app.include_router(journal_ai.router, prefix="/ai")
app.include_router(report_ai.router, prefix="/ai")

# -----------------------------
# ✅ optional parent api routes later
# -----------------------------
