# Product Requirements Document (PRD) & Technical Specifications
## Project: SCHOLASTIC A EDU. DEPOT (SED) Platform

---

## 1. Executive Summary
**SCHOLASTIC A EDU. DEPOT (SED)** is a web-based EdTech platform designed to bridge the gap between academic learning and industry demands. The platform serves three distinct user groups: Students seeking training and placement, Administrators managing content and leads, and Trainers utilizing AI tools for content creation.

**Current Status:** MVP (Minimum Viable Product) with functional frontend, MongoDB database connection, basic JWT authentication, and AI integration.
**Goal:** Transition from MVP to a Production-Ready, Scalable Application.

---

## 2. User Personas & User Stories

### A. The Student
*   **Goal:** Upskill, build a resume, and get hired.
*   **Key Features:**
    *   Browse & Search Courses/Programs.
    *   User Authentication (Sign Up/Login/Password Reset).
    *   **Dashboard:** View enrolled courses, track progress, view saved courses.
    *   **Checkout:** Securely pay for courses (One-time or EMI).
    *   **AI Resume Builder:** Generate a resume based on profile and course skills.
    *   **Interactive Demos:** Try coding exercises within the browser.

### B. The Administrator
*   **Goal:** Manage business operations, content, and analyze performance.
*   **Key Features:**
    *   **CMS (Content Management System):** CRUD operations for Courses, Partners, Services, and Blog Posts.
    *   **Lead Management:** View contact form submissions and export to CSV.
    *   **AI Content Generation:** Auto-generate blog posts, social media captions, and course descriptions using Gemini.
    *   **Analytics:** Dashboard with enrollment stats and revenue metrics.

### C. The Trainer
*   **Goal:** Enhance course materials.
*   **Key Features:**
    *   **Video Generation:** Create AI explainer videos (via Veo) for course modules.
    *   **Dashboard:** Manage specific course content (Future scope).

---

## 3. Technical Infrastructure Requirements

### A. Cloud Storage (AWS S3 or Cloudinary)
*   **Current State:** Images are stored as Base64 strings in MongoDB (Not scalable, 16MB doc limit).
*   **Requirement:**
    *   Set up **AWS S3** (Simple Storage Service) buckets.
    *   Implement **Multer** (Node.js middleware) to handle file streams.
    *   **Workflow:** Frontend uploads image -> Backend sends to S3 -> S3 returns URL -> Backend saves URL to MongoDB.
    *   **Assets to store:** Course banners, Instructor photos, Partner logos, Generated AI videos.

### B. Payment Gateway (Razorpay or Stripe)
*   **Current State:** Mock checkout with a 2-second simulated delay.
*   **Requirement:**
    *   **Provider:** **Razorpay** (Best for Indian market/INR) or **Stripe** (Global).
    *   **Integration:**
        *   Create `/api/payment/create-order` endpoint.
        *   Implement Webhooks to listen for `payment.success` or `payment.failed` events.
        *   Securely update User Enrollment status in MongoDB only after webhook verification.

### C. Email Service (Transactional)
*   **Current State:** No actual emails are sent; console logs only.
*   **Requirement:**
    *   **Provider:** **SendGrid**, **AWS SES**, or **Nodemailer** (with SMTP).
    *   **Triggers:**
        *   Welcome Email (on Registration).
        *   Password Reset Link (with unique token).
        *   Order Confirmation/Receipt.
        *   "Contact Us" Auto-reply.

### D. AI Proxy Server
*   **Current State:** Frontend calls Gemini/Veo APIs directly (Exposes API Keys or requires user input).
*   **Requirement:**
    *   Move all AI logic to Backend Controllers (`/api/ai/...`).
    *   Store `GOOGLE_API_KEY` in backend `.env` only.
    *   Implement rate limiting on these endpoints to prevent cost spikes.

---

## 4. Database Schema Refinements (MongoDB)

*   **Users:** Add fields for `resetPasswordToken`, `resetPasswordExpire`, `paymentHistory`.
*   **Courses:** Change `imageUrl` from String (Base64) to String (URL).
*   **Videos:** Create a schema to track AI-generated video status and S3 URLs.

---

## 5. Security Requirements

*   **Environment Variables:** strictly use `.env` for Mongo URI, JWT Secrets, API Keys, and AWS Credentials. **Never commit .env to Git.**
*   **HTTP Headers:** Implement **Helmet.js** to set secure HTTP headers (XSS protection, No-Sniff).
*   **Rate Limiting:** Use `express-rate-limit` to prevent DDoS and brute-force attacks on Login/Register routes.
*   **Data Sanitization:** Use `express-mongo-sanitize` to prevent NoSQL injection.
*   **Input Validation:** Implement **Joi** or **Zod** to validate request bodies before processing.
*   **CORS:** Restrict `Access-Control-Allow-Origin` to the specific frontend domain in production.

---

## 6. Deployment & DevOps

### A. Hosting Strategy
*   **Frontend:** Vercel or Netlify (Excellent for React/Vite apps).
*   **Backend:** Render, Heroku, or AWS EC2 (Node.js hosting).
*   **Database:** MongoDB Atlas (Managed Cluster).

### B. CI/CD
*   Set up GitHub Actions to run linting and build checks on push.
*   Automate deployment to Vercel/Render on merge to `main`.

---

## 7. Implementation Checklist

### Phase 1: Infrastructure & Cleanup (Immediate)
- [ ] Move MongoDB URI and Secrets to `.env`.
- [ ] Setup AWS S3 Bucket and IAM User.
- [ ] Refactor Image Upload logic (Frontend & Backend).
- [ ] Implement Nodemailer for "Forgot Password" flow.

### Phase 2: Payments & Security
- [ ] Register for Razorpay/Stripe Test Account.
- [ ] Implement Checkout API.
- [ ] Add Helmet and Rate Limiting middleware.

### Phase 3: Production Polish
- [ ] Run accessibility audit (Lighthouse).
- [ ] Optimize images (convert to WebP before uploading to S3).
- [ ] Setup MongoDB Atlas backup policies.

---

## 8. Cost Estimates (Approximate)

| Service | Tier | Estimated Cost |
| :--- | :--- | :--- |
| **Hosting (Vercel/Render)** | Hobby/Starter | Free - $7/mo |
| **Database (Mongo Atlas)** | M0 Sandbox | Free |
| **Storage (AWS S3)** | Standard | ~$0.023/GB |
| **AI (Gemini)** | Flash Model | Free Tier (Rate limited) / Pay-as-you-go |
| **Email (SendGrid)** | Free Tier | Free (up to 100/day) |
| **Domain Name** | .com | ~$12/year |

