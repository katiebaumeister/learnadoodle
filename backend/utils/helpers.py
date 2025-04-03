from fastapi import Request, HTTPException
from functools import wraps
import traceback

def ai_agent():
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            try:
                data = await args[0].json()
                # Logging incoming AI call (optional)
                print("Incoming AI Call:", data)
                result = await func(*args, data=data, **kwargs)
                return result
            except Exception as e:
                traceback.print_exc()
                raise HTTPException(status_code=500, detail=str(e))
        return wrapper
    return decorator

def standard_response(message: str = "ok"):
    return {"status": "success", "message": message}
