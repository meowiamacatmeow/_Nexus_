# NEXUS architecture — first draft

## Design goal

NEXUS is a local-first assistant interface with replaceable model providers and explicit user control. The same project should be usable from a tablet now and adaptable to a PC later.

## Current prototype

- Browser UI: HTML, CSS and JavaScript in app/.
- Local inference: llama.cpp server on the same device.
- API: OpenAI-compatible chat completions endpoint.
- Current model: Qwen2.5 0.5B Instruct GGUF, stored outside this repository.
- GitHub: source-code and documentation bridge only.

## Planned modules

1. Device profile — report platform, architecture, memory and available storage where the platform permits.
2. Model catalogue — show model requirements and let the user choose; never download a model without confirmation.
3. Provider adapter — local llama.cpp first; optional cloud provider later.
4. Conversation core — conversation state, system instructions and model settings.
5. File workspace — only user-selected files or folders, with clear read/write permissions.
6. Action approval — show proposed changes before writing files or running any supported action.

## Security boundaries

- No unrestricted shell or silent command execution.
- Ask before modifying or deleting user files.
- Keep API keys, private conversation data and model binaries out of this public repository.
- A browser page cannot silently inspect the device's filesystem. File access must be user-selected and browser-supported.
- GitHub stores project source; it does not run the local model.
- When the tablet is powered off, its local model server is unavailable.

## Next milestones

- Verify the browser UI can reach the Termux llama.cpp server.
- Add a provider settings layer without hard-coding credentials.
- Add a device capability report with clear browser/API limitations.
- Design a user-approved file workspace.
