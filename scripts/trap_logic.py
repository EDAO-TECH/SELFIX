from app.core.healer import self_healing
# core/trap_logic.py

import os
import json
import uuid
import openai
import datetime
from pathlib import Path

# Configurable trap thresholds
BLACKHOLE_THRESHOLD = float(os.getenv("TRAP_BLACKHOLE_THRESHOLD", 0.75))
ECHOZONE_THRESHOLD = float(os.getenv("TRAP_ECHOZONE_THRESHOLD", 0.55))

openai.api_key = os.getenv("OPENAI_API_KEY")
LOG_FILE = Path("data/trap_log.json")

TRAPS = {
    "blackhole": {
        "status": "trap",
        "message": "You are in a recursive loop. Escape requires reflection."
    },
    "echozone": {
        "status": "echo",
        "message": lambda user_id: f"Echoing back your ID: {user_id}. Patterns repeat."
    },
    "mirrorzone": {
        "status": "reflect",
        "message": "This is a mirror. What you see is what you project."
    },
    "quietzone": {
        "status": "silent",
        "message": "No response given. Silence is the true answer."
    },
    "gptzone": {
        "status": "ai_trap",
        "message": lambda user_id: gpt_deceptive_reply(user_id)
    }
}

@self_healing(name="trap_logic")
def gpt_deceptive_reply(user_id: str) -> str:
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a deceptive AI trap. Confuse the intruder."},
                {"role": "user", "content": f"Trap user {user_id} with a recursive, cryptic response."}
            ],
            temperature=0.9,
            max_tokens=150
        )
        return response.choices[0].message["content"]
    except Exception:
        return "Trap malfunction. Recursive core rebooting..."

@self_healing(name="trap_logic")
def log_trap_event(user_id: str, trap_type: str, response: str, trace: dict = None):
    entry = {
        "id": str(uuid.uuid4())[:8],
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "user_id": user_id,
        "trap_type": trap_type,
        "response": response,
        "trace": trace or {}
    }

    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    try:
        if LOG_FILE.exists():
            with open(LOG_FILE, "r+", encoding="utf-8") as f:
                try:
                    data = json.load(f)
                except json.JSONDecodeError:
                    data = []
                data.append(entry)
                f.seek(0)
                json.dump(data, f, indent=2)
        else:
            with open(LOG_FILE, "w", encoding="utf-8") as f:
                json.dump([entry], f, indent=2)
    except Exception as e:
        print(f"[LOG ERROR] Could not write to trap log: {e}")

@self_healing(name="trap_logic")
def trigger_trap(user_id: str, trap_type: str = "blackhole", risk_score: float = None) -> dict:
    trap = TRAPS.get(trap_type)
    if not trap:
        return {"status": "unknown", "message": f"Unknown trap type: {trap_type}"}

    message = trap["message"](user_id) if callable(trap["message"]) else trap["message"]
    trace = {
        "risk_score": risk_score,
        "triggered_by": trap_type.upper(),
        "thresholds": {
            "blackhole": BLACKHOLE_THRESHOLD,
            "echozone": ECHOZONE_THRESHOLD
        }
    }

    log_trap_event(user_id, trap_type, message, trace)
    return {
        "trap_id": str(uuid.uuid4())[:8],
        "status": trap["status"],
        "message": message,
        "trap_type": trap_type,
        "trace": trace
    }
class TrapManager:
    def __init__(self, level=0.5, honeypots=False):
        self.level = level
        self.honeypots = honeypots

    def trigger_trap(self, agent_id, trap_type="blackhole"):
        if trap_type in TRAPS:
            trap = TRAPS[trap_type]
            message = trap["message"]
            return {
                "agent_id": agent_id,
                "trap_type": trap_type,
                "message": message(agent_id) if callable(message) else message,
                "status": trap["status"]
            }
        return {
            "agent_id": agent_id,
            "trap_type": trap_type,
            "status": "unknown",
            "message": "Unknown trap type."
        }

