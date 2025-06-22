from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from datetime import datetime
import uvicorn
import json
import os
from app.core.healer import self_healing

# ──────────────────────────────────────────────
# 🚀 Initialize FastAPI + Templates
# ──────────────────────────────────────────────
app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

# ──────────────────────────────────────────────
# 📊 In-Memory Karma DB & Log Path
# ──────────────────────────────────────────────
karma_scores = {
    "0xabc": 0.9,
    "0xdef": 0.6,
    "0x999": 0.1
}
LOG_PATH = "data/deception_log.json"

# ──────────────────────────────────────────────
# 🧠 Core Utilities
# ──────────────────────────────────────────────
@self_healing(name="yang_engine")
def log_event(user_id, event_type, metadata):
    log = {
        "timestamp": datetime.utcnow().isoformat(),
        "user_id": user_id,
        "event": event_type,
        "details": metadata
    }
    os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)
    with open(LOG_PATH, "a") as f:
        f.write(json.dumps(log) + "\n")

@self_healing(name="yang_engine")
def read_log():
    if not os.path.exists(LOG_PATH):
        return []
    with open(LOG_PATH, "r") as f:
        return [json.loads(line) for line in f if line.strip()]

@self_healing(name="yang_engine")
def get_karma(user_id):
    return karma_scores.get(user_id, 0.5)

@self_healing(name="yang_engine")
def update_karma(user_id, boost=0.1):
    current = karma_scores.get(user_id, 0.5)
    new_score = min(current + boost, 1.0)
    karma_scores[user_id] = new_score
    return new_score

@self_healing(name="yang_engine")
def calculate_entropy(actions):
    return sum(actions) / len(actions) if actions else 0

@self_healing(name="yang_engine")
def assess_risk(session):
    entropy = calculate_entropy(session["actions"])
    karma = get_karma(session["user_id"])
    return (entropy * 0.6) + ((1 - karma) * 0.4)

@self_healing(name="yang_engine")
def trigger_trap(user_id, trap_type="blackhole"):
    if trap_type == "blackhole":
        return {"status": "trap", "message": "You are in a recursive loop."}
    elif trap_type == "echozone":
        return {"status": "echo", "message": f"Echoing: {user_id}"}
    return {"status": "unknown", "message": "Unknown trap"}

@self_healing(name="yang_engine")
def process_session(session):
    user_id = session["user_id"]
    risk = assess_risk(session)

    if risk > 0.75:
        log_event(user_id, "TRAP", {"risk": risk})
        return trigger_trap(user_id, "blackhole")
    elif risk > 0.55:
        log_event(user_id, "ECHOZONE", {"risk": risk})
        return trigger_trap(user_id, "echozone")
    else:
        log_event(user_id, "PASS", {"risk": risk})
        return {"status": "pass", "message": "Access granted"}

@self_healing(name="yang_engine")
def process_redemption(user_id, score):
    if score >= 80:
        new_karma = update_karma(user_id, boost=0.2)
        log_event(user_id, "REINSTATED", {"new_karma": new_karma})
        return {"status": "reinstated", "karma": new_karma}
    else:
        log_event(user_id, "REDEEM_FAILED", {"score": score})
        return {"status": "failed", "message": "Redemption score too low"}

# ──────────────────────────────────────────────
# 🌐 API Routes
# ──────────────────────────────────────────────
@app.post("/api/risk")
async def risk_endpoint(request: Request):
    data = await request.json()
    user_id = data.get("user_id")

    karma = get_karma(user_id)
    if karma < 0.3:
        log_event(user_id, "BANNED", {"karma": karma})
        return {
            "status": "banned",
            "message": "User karma too low. Access denied.",
            "karma": round(karma, 2)
        }

    result = process_session(data)
    return result

@app.get("/karma/{user_id}")
def karma_for_user(user_id: str):
    score = get_karma(user_id)
    return {
        "user_id": user_id,
        "karma": round(score, 2),
        "status": (
            "trusted" if score >= 0.75 else
            "borderline" if score >= 0.5 else
            "at risk"
        )
    }

@app.get("/karma")
def karma_all():
    return karma_scores

@app.post("/redeem")
async def redeem(request: Request):
    data = await request.json()
    user_id = data["user_id"]
    score = data["test_score"]
    return process_redemption(user_id, score)

@app.get("/log")
def get_logs():
    return read_log()

@app.get("/status")
def status():
    return {"status": "online", "message": "Deception Engine ready"}

@app.get("/dashboard", response_class=HTMLResponse)
def dashboard(request: Request):
    users = karma_scores
    logs = read_log()
    return templates.TemplateResponse("dashboard.html", {
        "request": request,
        "users": users,
        "logs": logs
    })

# ──────────────────────────────────────────────
# 🔁 Run the Server
# ──────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run("deception_engine:app", host="127.0.0.1", port=8000, reload=True)

