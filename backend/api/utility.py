from fastapi import APIRouter, Depends
from backend.auth.firebase_auth import require_parent

router = APIRouter()

@router.get("/ping")
async def ping(family=Depends(require_parent)):
    return {"message": f"Hello {family['name_parent']}!"}
