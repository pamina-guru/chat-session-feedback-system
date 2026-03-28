# AI_JOURNAL.md

## 1. Representative Prompts Used

Below are representative examples of the kinds of prompts I used while building the solution.

---

### Prompt 1
> I am building a full-stack take-home assignment with Spring Boot + Kotlin, Next.js, and MongoDB. Help me structure the system clearly into admin feedback form configuration and public feedback submission flows. Summarize the architecture and responsibilities of each part.

---

### Prompt 2
> I have a public feedback page that must support active, expired, invalid, and already-responded states. Help me design the logic cleanly so that these are request-level states, not separate admin-created forms.

---

### Prompt 3
> I want the homepage to feel more recruiter-friendly. Instead of only raw demo links, help me redesign the UI so there are clear admin and public entry points, enterprise selection, and a demo flow that still stays aligned with the assignment.

---

### Prompt 4
> My admin feedback form is working, but the UI feels too basic. How can I improve the structure so it's cleaner, more organized, and still easy to edit things like header, footer, rating labels, and skip channels without overcomplicating it?

---

### Prompt 5
> I want to improve the admin form editor so it still respects the required fields in the spec, but feels more polished and clearer validation-aware UX without over-engineering it.

---

## 2. What AI Generated That Was Useful

AI was most useful when it helped with:

### a) Structuring the project clearly
One of the biggest benefits was using AI to reason through the system structure:
- how to separate admin vs public flows
- how to represent request states cleanly
- how to make the demo experience more intuitive for a reviewer

This helped avoid a confusing or overly flat UI.

---

### b) Drafting and refining UI code
AI was useful for producing and refining:
- Next.js route/page structure
- reusable card-based layouts
- the admin form editor layout
- live preview UI patterns

This significantly sped up frontend development.

---

### c) Writing and refining validation logic
AI helped suggest validation rules such as:
- handling blank vs optional fields
- maximum length constraints
- exact array sizes (rating labels)
- duplicate channel prevention

These acted as a strong checklist, even when I refined them further.

---

### d) Debugging and iteration support
AI was helpful when:
- fixing incorrect file paths
- correcting API calls
- resolving frontend-backend mismatches
- refining state handling logic

---

## 3. One AI Suggestion I Rejected and Why

One suggestion I rejected was modeling `EXPIRED`, `INVALID`, and `ALREADY_RESPONDED` as separate admin-configurable form variants.

I rejected this because it mixes two different responsibilities:

- **Form configuration (admin responsibility)**
- **Feedback request lifecycle (system behavior)**

The correct approach is:
- admin configures a single feedback form
- each feedback request determines its own state

This keeps the domain model clean and avoids incorrect abstraction.

---

## 4. How I Validated or Corrected AI-Generated Code

I did not treat AI-generated code as automatically correct. I validated it using multiple approaches.

---

### a) Compared against the assignment requirements
Every major decision was checked against:
- required features
- validation rules
- expected API behavior
- scope limitations

---

### b) Verified logic against real-world behavior
I ensured:
- feedback can only be submitted once
- expired links are rejected
- invalid IDs are handled safely
- rating values stay within range

---

### c) Adjusted structure to match project setup
AI-generated code often required adjustments to:
- Next.js App Router structure
- file paths and folder hierarchy
- environment variables
- API base URLs

---

### d) Simplified overly complex suggestions
Some AI suggestions introduced unnecessary complexity. I simplified them to keep the system:

- easy to understand
- easy to run
- aligned with the assignment scope

---

### e) Tested flows manually using seeded data
I validated behavior by:
- testing different feedback IDs (valid, expired, used)
- submitting ratings
- verifying API responses
- checking UI state transitions

---

## 5. Reflection on Using AI

AI was helpful as a support tool for:
- structuring ideas
- speeding up implementation
- refining UI and logic

However, it was not used blindly.

The most effective approach was:
1. generate suggestions
2. evaluate them critically
3. adapt them to the problem
4. keep only what improves clarity and correctness

This ensured the final solution remained intentional, accurate, and aligned with the assignment.