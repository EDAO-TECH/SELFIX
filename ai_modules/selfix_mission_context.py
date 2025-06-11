import json
import time
from pathlib import Path

MISSION_CONTEXT_FILE = Path("/opt/SELFIX/data/mission_context.json")

class MissionContext:
    def __init__(self):
        self.context = {
            "goal": "Stabilize and improve SELFIX API and healing stack.",
            "reminder": "Agents, suggest improvements and ask for scripts if needed.",
            "timeline": []
        }
        self._load()

    def _load(self):
        if MISSION_CONTEXT_FILE.exists():
            with open(MISSION_CONTEXT_FILE, "r") as f:
                self.context = json.load(f)

    def save(self):
        with open(MISSION_CONTEXT_FILE, "w") as f:
            json.dump(self.context, f, indent=2)

    def update_goal(self, goal):
        self.context["goal"] = goal
        self.add_event(f"Goal updated: {goal}")
        self.save()

    def add_event(self, description):
        self.context["timeline"].append({
            "timestamp": time.time(),
            "event": description
        })
        self.save()

    def get_context(self):
        return self.context

    def print_summary(self):
        print(f"[🧠] Current Goal: {self.context['goal']}")
        print(f"[💡] Reminder to agents: {self.context['reminder']}")
        print("[📜] Recent Actions:")
        for item in self.context["timeline"][-5:]:
            print(f" - {time.ctime(item['timestamp'])}: {item['event']}")

# For testing or reminder broadcast
if __name__ == "__main__":
    mc = MissionContext()
    mc.print_summary()
