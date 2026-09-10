---
name: create-commit
description: Review staged changes and create a well-structured Git commit.
disable-model-invocation: true
---

Create a Git commit for the current staged changes.

## Process

1. Run `git status --short`.
2. Inspect the staged diff using `git diff --cached`.
3. Do not include unrelated changes.
4. If no changes are staged, stop and inform the user.
5. Run relevant tests, linting, or type checking when practical.
6. Create the commit only after understanding the complete staged diff.
7. Do not push, amend, or force-push unless explicitly requested.

## Commit message format

Use Conventional Commits:

`type(scope): concise description`

Allowed types:

- `feat`: new functionality
- `fix`: bug fix
- `refactor`: restructuring without changing behaviour
- `test`: adding or updating tests
- `docs`: documentation
- `style`: formatting without behavioural changes
- `chore`: maintenance and tooling
- `build`: build system or dependency changes
- `ci`: continuous integration changes

## Message rules

- Write commit messages in English.
- Use imperative mood.
- Use lowercase after the colon.
- Do not end the subject with a period.
- Keep the subject concise, preferably under 72 characters.
- Describe the reason for the change, not merely the filenames.
- Add a body only when it provides useful context.
- Never claim that tests passed unless they were actually run.

Examples:

- `feat(fields): add query for SODIR field data`
- `fix(products): display API errors correctly`
- `chore(frontend): configure Tailwind CSS`
- `style(frontend): add Prettier configuration`