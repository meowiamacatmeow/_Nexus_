# NEXUS

**A local-first AI workspace, starting on Android with Termux and llama.cpp.**

NEXUS aims to provide one interface for local models, optional cloud providers, and carefully permissioned tools.

## Current status

Prototype 0.1 contains a lightweight browser chat interface intended to connect to a llama.cpp server running on the same device. It is an early foundation, not yet a full autonomous agent.

## Repository layout

- app/ — browser interface
- docs/ — architecture and development notes
- .gitignore — excludes model files and private configuration

## Safety and privacy

Do not commit model binaries, API keys, private conversation data, or personal files. This repository is public. NEXUS will require approval before file modifications or other consequential actions.

## Important limitation

GitHub is the source-code bridge, not an inference host. Local inference is available only while the device running llama.cpp is on and the server is running.

See docs/architecture.md for the roadmap.
