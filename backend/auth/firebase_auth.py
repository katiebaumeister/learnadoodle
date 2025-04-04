import os
import json
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import Depends, HTTPException, Header
from functools import wraps

# Load Firebase service account JSON from environment
FIREBASE_JSON = os.getenv("FIREBASE_JSON")

if not FIREBASE_JSON:
    raise Exception("FIREBASE_JSON not set")

# Convert stringified JSON to a dictionary
firebase_creds_dict = json.loads(FIREBASE_JSON)
cred = credentials.Certificate(firebase_creds_dict)

# Initialize Firebase only once
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)


# ✅ Helper to verify token
def verify_firebase_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid Firebase token")


# ✅ Use in routes to require authenticated user
async def require_parent(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    
    token = authorization.split("Bearer ")[1]
    decoded_token = verify_firebase_token(token)

    # You can add custom role check here if needed
    # if decoded_token.get("role") != "parent":
    #     raise HTTPException(status_code=403, detail="Access denied")

    return decoded_token
