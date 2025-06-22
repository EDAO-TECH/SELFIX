from fastapi import FastAPI, Request, Header, HTTPException
from fastapi.responses import JSONResponse
import json
import os
import time
from pathlib import Path

app = FastAPI()
API_TOKEN = os.getenv("SELFIX_API_TOKEN", "insecure-default-token")
CONTEXT_PATH = Path("/opt/SELFIX/ai_modules/selfix_mission_context.json")

@app.middleware("http")
async def verify_token(request: Request, call_next):
    if request.url.path.startswith("/purify") or request.url.path.startswith("/mission"):
        auth = request.headers.get("Authorization")
        if auth != f"Bearer {API_TOKEN}":
            return JSONResponse(status_code=403, content={"detail": "Invalid or missing token"})
    return await call_next(request)

@app.post("/purify")
async def purify_behavior(request: Request):
    payload = await request.json()
    actions = payload.get("actions", [])
    user_id = payload.get("user_id", "anonymous")

    karma = round(0.5 + 0.25 * len(actions), 2)
    trust_level = "Enhanced" if karma >= 0.75 else "Standard"

    log_path = Path("/opt/SELFIX/logs/api_activity.log")
    log_path.parent.mkdir(parents=True, exist_ok=True)
    log_path.write_text(json.dumps({
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "user": user_id,
        "karma": karma,
        "trust_level": trust_level
    }, indent=2))

    return {
        "user_id": user_id,
        "karma": karma,
        "trust_level": trust_level,
        "actions_analyzed": len(actions)
    }

@app.get("/mission")
def get_mission_context():
    if not CONTEXT_PATH.exists():
        raise HTTPException(status_code=404, detail="Mission context not found.")
    try:
        return json.loads(CONTEXT_PATH.read_text())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Context load error: {str(e)}")

@app.post("/mission")
async def update_mission(request: Request):
    payload = await request.json()
    CONTEXT_PATH.parent.mkdir(parents=True, exist_ok=True)
    CONTEXT_PATH.write_text(json.dumps(payload, indent=2))
    return {"status": "Mission updated", "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")}

@app.get("/status")
def api_status():
    return {
        "api": "SELFIX Local API",
        "status": "running",
        "time": time.strftime("%Y-%m-%d %H:%M:%S"),
        "mission_loaded": CONTEXT_PATH.exists()
    }
