# 🧠 Chat Session Feedback System

> A full-stack multi-tenant SaaS system for collecting customer feedback after chatbot sessions across multiple channels.

---

## 📌 Overview

This project simulates a **multi-enterprise chatbot feedback platform**, where each enterprise can configure its own feedback form and customers receive a unique link to rate their chat experience (1–5 stars).

**Key goals:**
- Clean full-stack architecture
- Clear and consistent API design
- Strong validation logic
- Real-world edge case handling
- Structured and scoped engineering execution

---

## 🏗️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend    | Spring Boot (Kotlin), REST APIs   |
| Database   | MongoDB                           |

---

## 👥 Multi-Enterprise Design

The system supports multiple enterprises operating independently.

| Enterprise   | Description                                           |
|--------------|-------------------------------------------------------|
| `acme-bank`  | Pre-configured form for testing all feedback states   |
| `uber`       | Fully configurable form via the admin UI              |

Each enterprise has:
- Its own feedback form configuration
- Separate feedback requests
- Independent UI behavior

---

## ✨ Features

## ✨ Features

### 🧑‍💼 Admin Portal (Enterprise-Based)

- Multi-tenant support using dynamic `enterpriseId` (e.g., Acme Bank, Uber)
- Load and manage feedback form configurations per enterprise
- Fully configurable feedback form fields:
  - Header text & description
  - Footer text
  - Rating labels (exactly 5 labels)
  - Thank you, error, and expiry messages
- Channel-based skip logic (WhatsApp, Instagram, Messenger, Web)
- Strong backend validation with clear error responses
- Live preview panel for real-time form visualization
- Instant save and publish behavior
- Demonstrates both:
  - Preconfigured enterprise (Acme Bank)
  - Fully dynamic configurable enterprise (Uber)

---

### 🌍 Public User Portal

- Access feedback forms via unique `feedbackId`
- Dynamic enterprise-based feedback experience
- Submit rating (1–5) with validation
- Handles all real-world feedback states:

  - ✅ **Active** — user can submit feedback
  - 🎉 **Success** — thank-you confirmation after submission
  - ❌ **Already Responded** — prevents duplicate submissions
  - ⏰ **Expired** — feedback link no longer valid
  - ⚠️ **Invalid** — feedback request not found

- Single-use feedback links enforced
- Supports multiple active and backup feedback links for demonstration
- UI dynamically adapts based on backend state and enterprise configuration

### ⚙️ Backend
- Feedback form configuration validation
- Single-use submission enforcement
- Expiry handling via timestamps
- Channel-based skip logic
- Consistent `code` + `message` response structure

---

## 🧪 Demo Data (Pre-seeded)

| Scenario              | Description                            |
|-----------------------|----------------------------------------|
| ✅ Active              | Valid feedback request, ready to submit |
| ⏰ Expired             | Link past its expiry time              |
| ❌ Already Responded   | Feedback already submitted             |
| ⚠️ Invalid             | Non-existent feedback ID               |

---
## 🗺️ Application Walkthrough

Once the backend is running and the frontend is started with `npm run dev`, the homepage will load automatically. Follow the flow below to explore the full system.

---

### 🏠 Step 1 — Homepage
The homepage presents two entry points: the **Admin Portal** and the **Public Portal**.

![Homepage](./screenshots/homepage.png)

---

### 🧑‍💼 Step 2 — Admin Portal

#### Enterprise Selection
Clicking **Open Admin Portal** loads two enterprises — `acme-bank` and `uber`. These two enterprises demonstrate the dynamic, multi-tenant nature of the system where each enterprise is identified by its own `enterpriseId`.

![Admin Enterprise Selection](./screenshots/admin-enterprise.png)

#### acme-bank — Pre-configured Admin Form
Selecting `acme-bank` loads a pre-configured feedback form with a **live preview panel** on the right side, as required by the assignment spec.

![acme-bank Form - View 1](./screenshots/acme-form1.png)
![acme-bank Form - View 2](./screenshots/acme-form2.png)
![acme-bank Form - View 3](./screenshots/acme-form3.png)
![acme-bank Form - View 4](./screenshots/acme-form4.png)

#### uber — Configurable Admin Form
Selecting `uber` opens a fully configurable form that the admin can customise freely. This contrasts with the `acme-bank` pre-configured form and highlights the independent configuration each enterprise has.

![uber Form - View 1](./screenshots/uber-form1.png)
![uber Form - View 2](./screenshots/uber-form2.png)
![uber Form - View 3](./screenshots/uber-form3.png)
![uber Form - View 4](./screenshots/uber-form4.png)

---

### 🌍 Step 3 — Public Portal

#### Enterprise Selection
Clicking **Open Public Portal** from the homepage shows the two enterprises available for customers to access.

![Public Portal - Enterprise Selection](./screenshots/publicportal-enterprise-selection.png)

---

### 🏦 Step 4 — acme-bank Public Feedback Links

Selecting `acme-bank` in the public portal displays pre-loaded demo feedback links:
- **2 active links** — one primary, one backup (to demonstrate single-use: once the first is submitted, the backup link can be used to show another submission)
- **1 expired link**
- **1 invalid link**
- **1 already submitted link**

![acme-bank Feedback Links Panel](./screenshots/acme-bank-user-form-previews.png)

#### ✅ Active Feedback — Primary Link
Clicking the active feedback link shows the customer-facing feedback form for `acme-bank`.

![acme-bank Active Feedback User](./screenshots/acme-bank-active-feedback-user.png)

#### ✅ Active Feedback — Backup Link
Clicking the backup active link shows the same feedback form with a different `feedbackId`, demonstrating that each link is unique and single-use.

![acme-bank Backup Feedback User](./screenshots/acme-bank-backup-feedback-user.png)

#### ⏰ Expired Link
![acme-bank Expired](./screenshots/acme-bank-user-expired.png)

#### ⚠️ Invalid Link
![acme-bank Invalid](./screenshots/acme-bank-user-invalid.png)

#### ❌ Already Submitted Link
![acme-bank Already Submitted](./screenshots/acme-bank-user-alreadysubmitted.png)

---

### 🚗 Step 5 — uber Public Feedback Links

Selecting `uber` in the public portal displays:
- **1 active link** and **3 backup active links** — demonstrating that once the first is submitted, the remaining three can still be used independently, reinforcing the single-use behaviour of each link.

![uber Feedbacks Panel](./screenshots/uber-feedbacks-panel.png)

#### ✅ Active Feedback — Primary Link
Clicking the first active link shows the customer-facing feedback form configured by the `uber` admin.

![uber Active Feedback User](./screenshots/uber-active-feedback-user.png)

#### ✅ Active Feedback — Backup Links
Clicking any of the three backup links shows the same form with a different `feedbackId` each time, confirming single-use link behaviour across all backup entries.

![uber Backup Feedback User](./screenshots/uber-backup-feedback-user.png)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pamina-guru/chat-session-feedback-system.git
cd chat-session-feedback-system
```

---

### 2. Run the Backend

**Prerequisites:** Java 17+, MongoDB running locally (default port 27017)

```bash
cd backend

# Mac/Linux
./gradlew bootRun

# Windows
gradlew.bat bootRun
```

Backend runs at: `http://localhost:8080`

Ensure MongoDB is running before starting the backend.

---

### 3. Run the Frontend

**Prerequisites:** Node.js v18+

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

### 4. Run Tests

The project includes backend and frontend tests covering validation, submission flow, data access, and UI state transitions.

#### 🔹 Admin Feedback Form Validation Tests
Verifies that the feedback form config is validated correctly before saving:
- ✅ Valid config saves successfully
- ❌ Blank `headerText` is rejected
- ❌ `ratingLabels` with fewer or more than 5 items is rejected
- ❌ Duplicate values in `skipForChannels` are rejected

![Admin Validation Tests](./screenshots/test1.png)

#### 🔹 Public Feedback Respond Endpoint Tests
Verifies the core behaviors of `POST /api/public/feedback/{feedbackId}/respond`:
- ✅ Submits successfully when active and rating is valid (1–5)
- ❌ Rejected when `feedbackId` does not exist
- ❌ Rejected when feedback is already responded to
- ❌ Rejected when feedback request has expired
- ❌ Rejected when rating is outside the 1–5 range

![Public Respond Endpoint Tests](./screenshots/test2.png)

#### 🔹 Repository Test
Verifies the MongoDB data access layer:
- ✅ A saved `FeedbackRequest` is retrieved correctly using `findByFeedbackId(...)`

![Repository Test](./screenshots/test3.png)

#### 🔹 RatingClient UI Test
Verifies the public rating submission flow using React Testing Library:
- ✅ `RatingClient` renders correctly
- ✅ User can click a rating option
- ✅ Component handles a mocked successful API response
- ✅ UI transitions to the success state and displays the thank-you message

![RatingClient UI Test](./screenshots/test4.png)

**Run backend tests:**
```bash
cd backend
./gradlew test
```

**Run frontend tests:**
```bash
cd frontend
npm run test
```


---

## 📡 API Reference

### Admin APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/admin/enterprises/{enterpriseId}/session-feedback-form` | Retrieve feedback form configuration for a specific enterprise |
| `PUT`  | `/api/admin/enterprises/{enterpriseId}/session-feedback-form` | Update feedback form configuration (labels, messages, channel settings) |

---

### Public APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/public/feedback/{feedbackId}` | Retrieve feedback request details, status (ACTIVE, EXPIRED, INVALID, ALREADY_RESPONDED), and form configuration |
| `POST` | `/api/public/feedback/{feedbackId}/respond` | Submit a rating for a feedback request with validation (single-use, expiry check, rating range) |

---

---

## 📥 Sample Requests & Responses

### Submit Feedback

**Request:**
```json
{
  "rating": 5
}
```

**Responses:**

```json
// Success
{ "code": "SUCCESS", "message": "Feedback submitted successfully." }

// Already Responded
{ "code": "ALREADY_RESPONDED", "message": "This feedback request has already been used." }

// Expired
{ "code": "EXPIRED", "message": "This feedback request has expired." }

// Invalid
{ "code": "INVALID", "message": "Feedback request not found." }
```

---

## 🧾 Feedback Form Configuration (Example)

```json
{
  "headerText": "How was your experience?",
  "headerDescription": "Your feedback helps us improve.",
  "footerText": "Thank you for your time.",
  "ratingLabels": ["Very Bad", "Bad", "Okay", "Good", "Excellent"],
  "thankYouText": "Thanks for your feedback!",
  "invalidReplyText": "Invalid feedback link.",
  "expiredReplyText": "This link has expired.",
  "skipForChannels": ["WHATSAPP"]
}
```

---

## ✅ Validation Rules

| Field                | Rule                                                  |
|----------------------|-------------------------------------------------------|
| `headerText`         | Required, max 120 characters                          |
| `headerDescription`  | Optional, max 300 characters                          |
| `footerText`         | Optional, max 200 characters                          |
| `ratingLabels`       | Exactly 5 values, all non-empty                       |
| `thankYouText`       | Required                                              |
| `invalidReplyText`   | Required                                              |
| `expiredReplyText`   | Required                                              |
| `skipForChannels`    | No duplicates, valid enum values only                 |

- Feedback can only be submitted once per `feedbackId`
- Expired feedback requests are rejected
- Rating must be between 1 and 5


---


## 💡 Highlights

- Multi-tenant (multi-enterprise) architecture
- Clean full-stack separation (Next.js + Spring Boot)
- Robust validation and consistent error handling
- All real-world feedback states handled gracefully
- Structured Git history reflecting development progression

---

## 👩‍💻 Author

**Pamina Guruparan**  
Computer Science Undergraduate · Full-Stack Enthusiast
