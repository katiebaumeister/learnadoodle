import firebase_admin
from firebase_admin import auth, credentials
from fastapi import HTTPException, Header
from functools import wraps
import os
import json

# Load Firebase service account JSON from env
FIREBASE_JSON = os.getenv("FIREBASE_JSON")

if FIREBASE_JSON:
    cred = credentials.Certificate(json.loads(FIREBASE_JSON))
    firebase_admin.initialize_app(cred)
else:
    raise Exception("FIREBASE_JSON not set")

def verify_firebase_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid Firebase token")
