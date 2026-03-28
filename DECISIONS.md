# DECISIONS.md

## 1. What I Prioritized

Given the time-boxed nature of the task, I focused on building a solution that is correct, clear, and easy to evaluate end-to-end.

### a) Clear separation between admin and public flows
I structured the system into two distinct parts:

- **Admin flow** → configure the feedback form
- **Public flow** → load a feedback request and submit a rating

This separation made the system easier to reason about and ensured responsibilities were clearly defined across both frontend and backend.

---

### b) Strong validation and predictable behavior
A major focus was ensuring the system behaves consistently under real-world conditions.

I implemented validation for:
- required vs optional fields
- maximum character limits
- exactly 5 rating labels
- non-empty labels
- duplicate `skipForChannels` prevention
- rating range enforcement (1–5)

On the public side:
- feedback links are single-use
- expired links are rejected
- invalid IDs are handled safely

---

### c) Reviewer-friendly demo experience
I designed the system so a reviewer can quickly understand and test it:

- pre-seeded feedback request states (active, expired, used, invalid)
- enterprise-based routing (`acme-bank`, `uber`)
- clear admin vs public entry points
- live preview in admin form editor

This ensures the system is not just functional, but **demonstrable**.

---

### d) Practical design over over-engineering
Since this is a scoped assignment, I chose clarity over unnecessary abstraction:

- simple REST controllers
- direct repository usage
- minimal but consistent response structure
- focused UI components

This keeps the code readable and aligned with the purpose of the task.

---

## 2. Assumptions I Made

### a) Authentication is out of scope
Based on the brief, I assumed no authentication or role-based access is required for this exercise.

---
### b) Enterprise setup is predefined

Given that `{enterpriseId}` is used as a dynamic path parameter in the API design, I assumed the system should demonstrate support for multiple enterprises rather than a single static one.

To reflect this, I introduced at least two enterprises:

- `acme-bank` (seeded reference enterprise with preloaded data)
- `uber` (configurable enterprise via the admin UI)

This helps showcase the dynamic nature of `{enterpriseId}` and reinforces the multi-tenant SaaS behavior expected from the system.


---

### c) Rating-only feedback is sufficient
The public form captures only a **1–5 rating**, which aligns with the core requirement.

---
### d) Feedback link generation is external
The system assumes that feedback links are generated and sent by another system.

This project focuses only on:
- loading a feedback request
- submitting a response
---

### e) Feedback states belong to the request, not the form
States such as:
- ACTIVE
- EXPIRED
- ALREADY_RESPONDED
- INVALID

are modeled as **feedback request states**, not admin-configured variations.

This keeps the domain model clean and logically correct.

---

## 3. What I Intentionally Left Out

### a) Authentication and authorization
Not included, as it is explicitly out of scope.

---

### b) Advanced analytics/dashboard
I did not implement:
- rating trends
- aggregated insights
- dashboards

These would be valuable in a real system but are beyond the assignment scope.

---

### c) Feedback delivery mechanisms
No implementation for:
- email/SMS sending
- webhook triggers
- notification pipelines

The assignment explicitly excludes how feedback links are sent.

---

### d) Text-based feedback
Only numeric rating is supported to keep the API simple and focused.

---

### e) Heavy architectural layering
I avoided adding extra abstraction layers (e.g., service layers, complex DTO mapping) unless necessary, to maintain simplicity and readability.

---

## 4. What I Would Do Next With Another Half Day

If I had additional time, I would shift focus toward **production readiness and polish**.

### a) Expand and strengthen test coverage
Testing has been incorporated as part of the development process.  
With more time, I would further expand:

- backend validation tests
- endpoint behavior tests (success + edge cases)
- frontend interaction tests

to improve confidence and robustness.

---

### b) Standardize API error contracts further
Refine all responses to follow a stricter and more uniform structure, especially for validation errors.

---

### c) Add admin insights (light analytics)
Introduce a simple admin panel showing:
- total responses
- average rating
- distribution of ratings

---

### d) Improve UX polish and accessibility
Enhance:
- accessibility (keyboard, focus states)
- micro-interactions
- responsive behavior
- clearer error messaging

---

### e) Deployment and environment setup
Even though deployment is out of scope, with additional time I would:

- containerize the app (Docker)
- deploy backend and frontend
- configure environment variables
- ensure easy reviewer access via a hosted demo

---

## 5. Final Reflection

My goal was to deliver a system that is:

- logically sound
- easy to understand
- fully testable
- aligned with real-world behavior
- clearly documented

Rather than overbuilding, I focused on completing the core system well, ensuring both correctness and clarity.

This approach best reflects how I would handle a scoped engineering task in a real-world setting.