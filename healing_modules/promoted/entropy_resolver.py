from app.core.healer import self_healing
# core/entropy_resolver.py

"""
📊 Entropy Resolver — Enhanced Risk Tracer
Calculates symbolic entropy from user actions and blends it with karma
to compute a meaningful session risk score — now with full trace context.
"""

from app.core.karma_guard import get_karma
from typing import List, Dict

@self_healing(name="entropy_resolver")
def calculate_entropy(actions: List[float]) -> float:
    """Simple average entropy of weighted actions."""
    return round(sum(actions) / len(actions), 3) if actions else 0.0

@self_healing(name="entropy_resolver")
def assess_risk(session: Dict, return_trace: bool = False):
    """
    Compute risk using: (0.6 * entropy) + (0.4 * (1 - karma))
    Optionally return full trace metadata for debugging or audit logging.
    """
    user_id = session.get("user_id", "unknown")
    actions = session.get("actions", [])

    entropy = calculate_entropy(actions)
    karma = get_karma(user_id)
    risk = round((0.6 * entropy) + (0.4 * (1 - karma)), 3)

    if return_trace:
        return {
            "user_id": user_id,
            "entropy": entropy,
            "karma": karma,
            "risk_score": risk,
            "formula": "risk = (0.6 * entropy) + (0.4 * (1 - karma))"
        }

    return risk
