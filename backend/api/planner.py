from fastapi import APIRouter, Depends
from backend.db.connect import get_session
from backend.auth.firebase_auth import require_parent

router = APIRouter()

@router.post("/generate_plan")
@require_parent()
def generate_plan(data: dict, family=Depends()):
    # mock response for planner
    return {"message": "Plan generated", "plan": data}
