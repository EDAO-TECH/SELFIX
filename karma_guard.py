from app.core.healing_utils import self_healing
# core/karma_guard.py

"""
🧘 Karma Guard — Reputation Ledger
Tracks user karma levels and enforces threshold-based consequences.

Karma ranges from 0.0 to 1.0:
- 1.0: Trusted
- 0.5: Neutral
- 0.3: Warning Zone
- <0.3: Banned / Restricted

Used by traps, entropy analysis, and healing engine.
"""

from typing import Dict

# In-memory karma store (can be replaced by DB later)
karma_scores: Dict[str, float] = {
    "0xabc": 0.9,
    "0xdef": 0.6,
    "0x999": 0.1
}

# Constants
DEFAULT_KARMA = 0.5
MIN_KARMA = 0.0
MAX_KARMA = 1.0
BAN_THRESHOLD = 0.3


# ──────────────────────────────────────────────
# 📈 Get Karma
# ──────────────────────────────────────────────
@self_healing(name="karma_guard")
def get_karma(user_id: str) -> float:
    """
    Retrieve the karma score for a given user.
    
    Returns default if user is unknown.
    """
    return karma_scores.get(user_id, DEFAULT_KARMA)


# ──────────────────────────────────────────────
# 📉 Update Karma
# ──────────────────────────────────────────────
@self_healing(name="karma_guard")
def update_karma(user_id: str, boost: float = 0.1) -> float:
    """
    Increase or decrease a user's karma.
    
    Args:
        boost: Can be positive (healing) or negative (trap hit)
    """
    current = get_karma(user_id)
    new_score = min(max(current + boost, MIN_KARMA), MAX_KARMA)
    karma_scores[user_id] = round(new_score, 3)
    return karma_scores[user_id]


# ──────────────────────────────────────────────
# 🚫 Check Ban Status
# ──────────────────────────────────────────────
@self_healing(name="karma_guard")
def is_banned(user_id: str) -> bool:
    """
    Returns True if user's karma is below the ban threshold.
    """
    return get_karma(user_id) < BAN_THRESHOLD


# ──────────────────────────────────────────────
# 📊 Get All Karma Scores (for UI or export)
# ──────────────────────────────────────────────
@self_healing(name="karma_guard")
def get_all_karma() -> Dict[str, float]:
    """
    Return full karma ledger (for admin dashboards or reporting).
    """
    return karma_scores
karma_cache = {}

@self_healing(name="karma_guard")
def reset_karma_cache():
    global karma_cache
    karma_cache = {}

