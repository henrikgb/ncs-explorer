---
name: pr-description
description: Generate a clear pull request title and description from the current branch changes.
disable-model-invocation: true
---

Generate a pull request title and description for the current branch.

Do not create or publish the pull request unless explicitly requested.

## Process

1. Inspect the current branch and Git status.
2. Determine the appropriate base branch.
3. Review the commits and complete diff against the base branch.
4. Describe the overall result, not every individual commit.
5. Mention important architectural decisions and known limitations.
6. Never claim that tests passed unless they were actually run.
7. Do not include empty or irrelevant sections.

## PR title

Use this format when appropriate:

`type(scope): concise description`

Keep the title concise and write it in English.

## PR description format

### Summary

Explain briefly why the change was needed and what it accomplishes.

### Changes

List the most important implementation changes.

### Testing

List tests, linting, type checking, or manual verification that was actually performed.

If nothing was tested, write:

`Not tested.`

### Screenshots

Include this section only when the changes affect the user interface and screenshots are available.

### Risks or limitations

Include this section only when there are relevant risks, limitations, follow-up work, or known issues.

## Writing rules

- Write in clear and concise English.
- Focus on behaviour and user or developer value.
- Avoid repeating commit messages.
- Avoid unnecessary technical detail.
- Do not invent issue numbers, test results, or requirements.
- Return the title first, followed by a ready-to-copy Markdown description.

## Examples

Use these examples as guidance for tone, structure, and level of detail. Adapt the content and sections to the actual changes. Do not copy facts, test results, issue numbers, or technical details from the examples.

### Example 1: New feature

**Title**

`feat(fields): add exploration of SODIR field data`

**Description**

```md
## Summary

Adds the first field exploration functionality to NCS Explorer. Field data is retrieved from SODIR through the Node.js BFF and presented in the React application.

## Changes

- Add a BFF endpoint for retrieving and normalizing SODIR field data
- Add TypeScript types for the normalized field response
- Add an Axios request function and TanStack Query hook
- Display loading, error, and success states in the frontend
- Add a responsive field overview

## Testing

- Ran ESLint successfully
- Ran the TypeScript build successfully
- Verified field loading and error handling manually
```

### Example 2: Bug fix

**Title**

`fix(products): handle unsuccessful API responses`

**Description**

```md
## Summary

Prevents unsuccessful product requests from being treated as valid responses and gives the user a meaningful error message.

## Changes

- Validate the HTTP response before processing the response body
- Preserve the API error message when it is available
- Add a fallback for unexpected errors
- Render the error message using an accessible alert

## Testing

- Verified successful product requests manually
- Verified handling of a simulated 500 response
- Ran ESLint successfully

## Risks or limitations

- Error messages still depend on the response format returned by the BFF
```

### Example 3: Tooling and configuration

**Title**

`chore(frontend): configure Tailwind CSS and Prettier`

**Description**

```md
## Summary

Adds consistent styling and automatic code formatting to the React frontend.

## Changes

- Configure Tailwind CSS using the Vite plugin
- Import Tailwind in the global stylesheet
- Add project-level Prettier configuration
- Configure two-space indentation
- Add scripts for formatting and checking files

## Testing

- Ran the frontend development server successfully
- Ran the production build successfully
- Verified formatting on save in VS Code
```

### Example 4: UI change with screenshots

**Title**

`feat(fields): add responsive field cards`

**Description**

```md
## Summary

Introduces responsive cards that make Norwegian Continental Shelf field information easier to scan across desktop and mobile screen sizes.

## Changes

- Add a reusable field card component
- Display field name, status, discovery year, and operator
- Add responsive grid layouts using Tailwind CSS
- Add hover and keyboard focus states
- Add empty and loading states

## Testing

- Ran ESLint successfully
- Ran the TypeScript build successfully
- Verified the layout manually on desktop and mobile viewport sizes

## Screenshots

### Desktop

<!-- Add desktop screenshot -->

### Mobile

<!-- Add mobile screenshot -->
```

## Example selection rules

- Do not include a section merely because it appears in an example.
- Include `Screenshots` only for visual changes when screenshots are available.
- Include `Risks or limitations` only when there is something meaningful to disclose.
- Describe only tests and verification that were actually performed.
- Use `Not tested.` when no verification was performed.
- Prefer concrete statements over generic phrases such as “various improvements.”