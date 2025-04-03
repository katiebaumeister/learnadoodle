from fastapi import APIRouter, Depends
from backend.db.connect import get_session
from backend.auth.firebase_auth import require_parent

router = APIRouter()

@router.get("/get_progress")
@require_parent()
def get_progress(family=Depends()):
    return {"progress": "Sample progress data"}
