from app.core.healer import self_healing
# app/core/soul_core.py

"""
💠 Soul Core Engine
Handles symbolic identities for agents including karma, spiritual role,
and BAZI-aligned essence. Can be used to enrich UIs or decision engines.
"""

import datetime

# In-memory soul registry (placeholder for future NFT-based system)
SOUL_REGISTRY = {
    "0xabc": {
        "soul_id": "soul-001",
        "karma": 0.92,
        "spiritual_role": "guardian",
        "essence": "wind",
        "traps_triggered": 1
    },
    "0xdef": {
        "soul_id": "soul-002",
        "karma": 0.45,
        "spiritual_role": "trickster",
        "essence": "metal",
        "traps_triggered": 3
    },
    "0x999": {
        "soul_id": "soul-003",
        "karma": 0.12,
        "spiritual_role": "lost",
        "essence": "void",
        "traps_triggered": 5
    }
}


@self_healing(name="soul_core")
def get_soul_profile(user_id: str) -> dict:
    """
    Retrieve symbolic soul profile for a given user ID.

    Args:
        user_id (str): User's address or identifier

    Returns:
        dict: Profile containing soul ID, karma, role, etc.
    """
    identity = SOUL_REGISTRY.get(user_id, {
        "soul_id": "soul-unknown",
        "karma": 0.5,
        "spiritual_role": "wanderer",
        "essence": "undefined",
        "traps_triggered": 0
    })

    profile = {
        "user_id": user_id,
        "soul_id": identity["soul_id"],
        "karma": identity["karma"],
        "alignment_score": round(identity["karma"] * (1.0 - 0.1 * identity["traps_triggered"]), 2),
        "status": identity["spiritual_role"].title(),
        "essence": identity["essence"],
        "symbol": "🧿" if identity["karma"] >= 0.7 else "⚠️" if identity["karma"] >= 0.4 else "☠️",
        "yin_guidance": get_yin_guidance(identity["karma"]),
        "traps_triggered": identity["traps_triggered"],
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "origin": "EDAO"
    }

    # Console log (optional dev view)
    print(f"""🧬 Soul loaded for this engine:
 → Role: {identity['spiritual_role']}
 → Essence: {identity['essence']}
 → Karma: {identity['karma']}
 → Soul ID: {identity['soul_id']}
""")

    return profile


@self_healing(name="soul_core")
def get_yin_guidance(karma: float) -> str:
    """
    Provide wisdom or advice based on karma level.

    Args:
        karma (float): User's karma score

    Returns:
        str: Wisdom message
    """
    if karma >= 0.75:
        return "Your path is clear. Help others who wander."
    elif 0.4 <= karma < 0.75:
        return "You are not lost, but not yet aligned. Reflect before acting."
    else:
        return "You carry weight. Redemption is possible, but you must change intention."
