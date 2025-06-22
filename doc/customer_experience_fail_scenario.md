# SELFIX Customer Experience Fail Scenario Playbook

## Scenario 1: Healing Module Crashes
- ❌ Issue: A promoted module fails to complete and causes instability.
- ✅ Response: rollback_manager.py automatically restores previous version.
- 🧠 Log: Added to healing_report.json and karma score reduced for module.

## Scenario 2: False Positive Healing
- ❌ Issue: System slows down after a misapplied fix.
- ✅ Response: User notified via status registry; manual override available.
- 🔁 Option: Selfix agent reverts to last known stable state.

## Scenario 3: Companion Fails to Execute Task
- ❌ Issue: agent002 doesn't process an instruction.
- ✅ Response: Selfix HQ triggers verify_engine.py and updates proxy.

## Scenario 4: User Confused by Logs
- ❌ Issue: Logs are too technical or cluttered.
- ✅ Response: Healing summary and human-friendly status file (`system_status.json`) shows:
  - "Healed modules: X"
  - "System stable: Yes"

## Scenario 5: Stuck Entropy Detected Again
- ❌ Issue: Same entropy event keeps returning.
- ✅ Response:
  - Karma drops
  - Agent disables offending module
  - Alert sent to HQ for reengineering
