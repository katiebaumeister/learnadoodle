from fastapi import APIRouter, Depends
from backend.auth.firebase_auth import require_parent

router = APIRouter()

@router.get("/joy_corner")
@require_parent()
def joy_corner(family=Depends()):
    return {"joy": "You are doing great!"}
