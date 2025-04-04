from firebase_admin import auth, credentials, initialize_app
from fastapi import Depends, HTTPException, Header
import os
import json

# Initialize Firebase Admin SDK from environment variable
FIREBASE_JSON = os.getenv("FIREBASE_JSON")
if FIREBASE_JSON:
    cred_dict = json.loads(FIREBASE_JSON)
    cred = credentials.Certificate(cred_dict)
    initialize_app(cred)
else:
    raise Exception("FIREBASE_JSON not set")

# Dependency to verify Firebase token
async def require_parent(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header format")
    token = authorization.split(" ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
