# SafeAid — AI Coding Agent Entry Point

Read the following files **in order** before implementing anything or making any architectural decision.
Do not skip any file. Do not assume you already know the project.

1. `context/project-overview.md` — what SafeAid is, who uses it, core user flows, features, and scope boundaries
2. `context/architecture.md` — full stack, system boundaries, folder ownership, storage model, and invariants the codebase must never violate
3. `context/ui-context.md` — colour tokens, typography, component conventions, and risk-level visual language
4. `context/code-standards.md` — TypeScript rules, file naming, API patterns, and conventions both backend and frontend must follow
5. `context/ai-workflow-rules.md` — how to scope work, handle ambiguity, and verify before moving on
6. `context/progress-tracker.md` — current phase, what is done, what is in progress, open questions, and what comes next

---

## Team ownership

| Folder | Owner |
|---|---|
| `/backend` | Emmanuel |
| `/frontend` | Teammate |
| `/context` | Both — update progress-tracker.md after every unit |

---

## After every meaningful implementation change

Update `context/progress-tracker.md`:
- Mark the unit complete under **Completed**
- Move the next unit into **In Progress**
- Log any architecture decisions made during implementation under **Architecture Decisions**
- Add session notes if resuming later

If an implementation change affects the architecture, storage model, or invariants documented in the context files, update the relevant file before continuing.
