#!/bin/bash
GOAL="$1"
[[ -z "$GOAL" ]] && echo "Usage: context_update.sh 'New mission goal'" && exit 1

python3 - <<EOF
from ai_modules.selfix_mission_context import MissionContext
ctx = MissionContext()
ctx.update_goal("$GOAL")
ctx.print_summary()
EOF
