from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.requests import Request

from sqlmodel import SQLModel
from backend.api import dev_utils  # 👈 Add this with the other imports

# 👇 Add this with the other include_router calls
app.include_router(dev_utils.router, prefix="/api", tags=["dev"])

from backend.db.connect import engine
from backend.api import (
    curriculum,
    utility,
    students,
    planner,
    joy,
    progress,
    seed  # ✅ Import the seed router
)

app = FastAPI(title="Learnadoodle API", version="0.1.0")

# ✅ Enable CORS with specific allowed origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create DB tables on startup
@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# ✅ Global exception handler for validation errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "detail": exc.errors(),
            "body": exc.body,
            "message": "Validation error occurred"
        },
    )

# ✅ Optional root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Learnadoodle API"}

# ✅ Include modular routers
app.include_router(curriculum.router, prefix="/api", tags=["curriculum"])
app.include_router(utility.router, prefix="/api", tags=["utility"])
app.include_router(students.router, prefix="/api", tags=["students"])
app.include_router(planner.router, prefix="/api", tags=["planner"])
app.include_router(joy.router, prefix="/api", tags=["joy"])
app.include_router(progress.router, prefix="/api", tags=["progress"])
app.include_router(seed.router, prefix="/api", tags=["seed"])  # ✅ Include the seed router
