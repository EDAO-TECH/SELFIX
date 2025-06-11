# Cyber Defender QA Checklist for Healing Scripts

## Script Identification
- [ ] Script filename includes component and version (e.g. `entropy_resolver_v2.py`)
- [ ] Located in the correct directory (`/opt/SELFIX/healing_modules/`)

## Basic Structure
- [ ] Has clear `__main__` or function entry point
- [ ] Contains header docstring with author and version
- [ ] Avoids deprecated Python functions or libraries

## Code Quality
- [ ] Uses exception handling (`try/except`) where needed
- [ ] Logs all major actions to `ai_phase_log.json`
- [ ] Follows PEP8 style (indentation, spacing, variable names)

## Functionality Tests
- [ ] Tested on clean system in passive mode
- [ ] Executes without crash
- [ ] Produces expected healing/logging behavior
- [ ] Leaves no residual files or states

## Security & Stability
- [ ] No external network access without approval
- [ ] Does not delete system files or sensitive logs
- [ ] Validated against known safe system configs

## Documentation & Submission
- [ ] Has README or inline doc explaining what the script heals
- [ ] Includes test case summary
- [ ] Version v1/v2/v3 marked clearly
- [ ] Approved by at least 1 QA lead

## Sign-off
- [ ] Script compressed and checksum recorded
- [ ] Copied to `/modules_verified/` after passing

Signed by QA Reviewer: _____________________
Date: _______________
