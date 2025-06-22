# /opt/SELFIX/api/selfix_defender.py

import uuid
import json
import logging
from datetime import datetime
import math

logger = logging.getLogger(__name__)


class LiquidPurifier:
    def __init__(self):
        self.score_weights = {
            "behavioral": 0.35,
            "interaction": 0.25,
            "verification": 0.25,
            "external": 0.15
        }

    def purify(self, user_id, actions):
        action_entropy = self._calculate_action_entropy(actions)
        suspicious_patterns = self._detect_suspicious_patterns(actions)

        trust_score = round(0.5 + 0.3 * (1 - action_entropy), 4)
        trust_level = self._get_trust_level(trust_score)

        return {
            "user_id": user_id,
            "karma": trust_score,
            "trust_level": trust_level,
            "action_entropy": action_entropy,
            "suspicious_patterns": suspicious_patterns,
            "guidance": f"Monitor {user_id} activity",
            "timestamp": datetime.utcnow().isoformat()
        }

    def _calculate_action_entropy(self, actions):
        if not actions:
            return 0.0

        action_counts = {}
        for action in actions:
            t = action.get("type", "unknown")
            action_counts[t] = action_counts.get(t, 0) + 1

        total = len(actions)
        entropy = 0.0
        for count in action_counts.values():
            p = count / total
            entropy -= p * math.log2(p)

        max_entropy = math.log2(len(action_counts)) if action_counts else 1
        return round(entropy / max_entropy if max_entropy > 0 else 0.0, 4)

    def _detect_suspicious_patterns(self, actions):
        suspicious = []
        if not actions or len(actions) < 5:
            return suspicious

        timestamps = sorted(a.get("timestamp", 0) for a in actions if "timestamp" in a)
        intervals = [timestamps[i+1] - timestamps[i] for i in range(len(timestamps)-1)]
        if sum(1 for i in intervals if i < 0.5) >= 3:
            suspicious.append("rapid_sequential_actions")

        resources = [a.get("resource") for a in actions if "resource" in a]
        if len(set(resources)) >= 10:
            suspicious.append("broad_resource_scanning")

        failures = [a for a in actions if a.get("status") == "failed"]
        if len(failures) >= 3:
            suspicious.append("repeated_failures")

        return suspicious

    def _get_trust_level(self, score):
        if score >= 0.9:
            return "Crystal"
        elif score >= 0.8:
            return "Purified"
        elif score >= 0.7:
            return "Distilled"
        elif score >= 0.6:
            return "Filtered"
        elif score >= 0.5:
            return "Refined"
        elif score >= 0.4:
            return "Unclear"
        elif score >= 0.3:
            return "Cloudy"
        elif score >= 0.2:
            return "Murky"
        return "Turbid"


def purify(user_id, actions):
    return LiquidPurifier().purify(user_id, actions)
