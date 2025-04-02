from fastapi import Depends, HTTPException
from firebase_admin import auth as firebase_auth

def verify_token(authorization: str = Depends(lambda: None)):
    # For local dev
    if os.getenv("ENVIRONMENT") == "DEV":
        return {"user_id": "dev-user"}
    # Real verification
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    token = authorization.replace("Bearer ", "")
    decoded_token = firebase_auth.verify_id_token(token)
    return decoded_token
