# 🎓 SCHOLASTIC A EDU. DEPOT (SED) - Next-Gen EdTech Platform

![SED Tech Academy Banner](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop)

[![React](https://img.shields.io/badge/Frontend-React_18-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-forestgreen?logo=mongodb)](https://www.mongodb.com/)
[![AI Powered](https://img.shields.io/badge/AI-Gemini_%2B_Veo-purple?logo=google)](https://ai.google.dev/)
[![AWS S3](https://img.shields.io/badge/Storage-AWS_S3-orange?logo=amazon-aws)](https://aws.amazon.com/s3/)

**SCHOLASTIC A EDU. DEPOT (SED)** is a production-grade Learning Management System (LMS) and Tech Academy platform. It bridges the gap between academic learning and industry demands through AI-driven tools, real-world projects, and a seamless learning experience.

---

## 🚀 Key Features

### 👨‍🎓 Student Experience (LMS)
*   **Course Discovery**: Advanced filtering, search, and categorization of tech programs.
*   **Interactive Learning**:
    *   **Video Player**: Built-in LMS lesson player supporting YouTube & MP4 streams.
    *   **Progress Tracking**: Granular tracking of completed lessons and course percentage.
*   **AI Tools**:
    *   **AI Resume Builder**: Generates professional resumes using **Gemini 2.5 Flash**.
    *   **RAG Chatbot**: Context-aware AI assistant that answers queries using **Local RAG (Ollama)** or Cloud Fallback.
    *   **Interactive Demos**: Live code editors for web development courses.
*   **Secure Checkout**: Integrated **Razorpay** payment gateway for secure transactions.
*   **User Dashboard**: Manage enrolled courses, view order history, and save favorites.

### 🛠️ Admin & Marketing Portal (CMS)
*   **Content Management**: Full CRUD for Courses, Partners, Services, and Blog Posts.
*   **AI Content Studio**:
    *   **Copywriter**: Auto-generate marketing blogs and social posts.
    *   **Image Generator**: Create course banners on the fly using **Gemini 2.5 Flash Image**.
    *   **Video Studio**: Generate promotional videos using **Google Veo**.
*   **Analytics Dashboard**: Real-time visualization of Revenue, Enrollments, and Lead generation.
*   **Lead Management**: View and export contact form submissions to CSV.

### 👨‍🏫 Trainer Tools
*   **Video Explainer Generator**: Create AI-driven video concepts for curriculum enhancement.

---

## 🏗️ Technical Architecture

The application follows a **Decoupled Monorepo** structure (Frontend + Backend).

### Frontend
*   **Framework**: React (Vite/CRA) + TypeScript
*   **Styling**: Tailwind CSS + Custom Animations
*   **State Management**: React Context API & Custom Hooks for testability.
*   **Routing**: React Router v6

### Backend API
*   **Runtime**: Node.js + Express
*   **Database**: MongoDB (Mongoose ODM)
*   **Security**: Helmet, Rate Limiting, JWT Auth, Input Validation (express-validator)
*   **Storage**: AWS S3 (via Multer) for scalable image hosting
*   **Communication**: Nodemailer (SMTP) for HTML emails

### 🤖 AI & RAG Layer
The backend acts as a **Secure Proxy** for all AI operations to protect API Keys.
1.  **Cloud AI**: Proxies requests to Google Gemini (Text/Image) and Veo (Video).
2.  **Local RAG (Hybrid)**:
    *   Attempts to connect to a local **Ollama** instance + **ChromaDB** for vector search.
    *   Falls back gracefully to Cloud Gemini if local AI services are offline.

---

## ⚙️ Installation & Setup

### 1. Prerequisites
*   Node.js (v18+)
*   MongoDB Connection String (Atlas or Local)
*   (Optional) Local Ollama & ChromaDB for RAG features.

### 2. Clone Repository
```bash
git clone https://github.com/your-org/sed-platform.git
cd sed-platform
```

### 3. Backend Setup
Navigate to the backend folder and install dependencies.
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following secrets:

| Variable | Description |
| :--- | :--- |
| `PORT` | Server port (e.g., 3001) |
| `MONGO_URI` | MongoDB Connection String |
| `JWT_SECRET` | Secret key for signing auth tokens |
| `API_KEY` | Google Gemini/Veo API Key |
| `AWS_ACCESS_KEY_ID` | AWS IAM Key for S3 |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM Secret |
| `AWS_BUCKET_NAME` | S3 Bucket Name |
| `AWS_REGION` | AWS Region (e.g., us-east-1) |
| `RAZORPAY_KEY_ID` | Razorpay Public Key |
| `RAZORPAY_KEY_SECRET` | Razorpay Secret Key |
| `SMTP_HOST` | Email Server Host (e.g., smtp.sendgrid.net) |
| `SMTP_PORT` | Email Server Port (e.g., 587) |
| `SMTP_USER` | SMTP Username (e.g., "apikey" for SendGrid) |
| `SMTP_PASS` | SMTP Password or API Key |
| `FROM_EMAIL` | The "from" email address for outgoing mail |
| `FROM_NAME` | The "from" name for outgoing mail |
| `ENABLE_AI_FEATURES` | `true` to enable RAG/Local LLM checks |

Start the server:
```bash
npm start
# Server runs at http://localhost:3001
```

### 4. Frontend Setup
Open a new terminal, navigate to the root, and install dependencies (if using a package manager for frontend, otherwise it runs via script injection in this specific environment).

*Note: In a standard React setup:*
```bash
npm install
npm start
# App runs at http://localhost:3000
```

---

## 🔐 Security Features

*   **Authentication**: Role-based access control (Student, Admin, Marketing, Trainer) with mandatory email verification.
*   **Data Integrity**: All inputs sanitized via `express-validator`.
*   **API Protection**:
    *   `helmet` for secure HTTP headers.
    *   `express-rate-limit` to prevent DDoS/Brute-force.
*   **Asset Security**: Direct S3 uploads via backend signed streams; no public write access to bucket.

---

## 🧪 Testing

*   **Strategy**: Business logic is decoupled from the UI via custom hooks (found in `/hooks`) for high testability. This separation of concerns allows for robust and isolated testing.
*   **Frontend (Unit & Integration)**: Components and hooks are unit-tested using **Jest** and **React Testing Library**.
*   **Backend (Integration & API)**: API endpoints are thoroughly tested using **Supertest** to ensure reliability and correctness.
*   **End-to-End (E2E)**: Critical user flows (e.g., registration, course enrollment, payment) are validated using **Cypress**.

---

## 📊 Analytics & Monitoring

The application is instrumented with a mock analytics service to demonstrate user behavior tracking, performance monitoring, and error reporting. This is implemented via a central abstraction layer, making it easy to integrate with any production analytics provider.

### 1. Analytics Abstraction (`services/analytics.ts`)

All analytics calls are routed through `services/analytics.ts`. This file exports several key functions:

*   `trackPageView(path)`: Logs a page view.
*   `trackEvent(name, params)`: Logs a custom user interaction (e.g., button click, form submission).
*   `reportError(error, info)`: Reports a JavaScript error.
*   `initPerformanceMonitoring()`: A placeholder to initialize Web Vitals tracking.

Currently, these functions simply log to the console.

### 2. Integration with a Production Service

To enable production analytics, modify `services/analytics.ts` to call your chosen provider's SDK.

**Example: Integrating Google Analytics (gtag.js) & Sentry**

```typescript
// services/analytics.ts
import * as Sentry from "@sentry/react";

// Initialize Sentry in index.tsx
// Sentry.init({ dsn: "YOUR_SENTRY_DSN" });

// --- Replace mock functions ---

export const trackPageView = (path: string): void => {
  window.gtag('config', 'YOUR_GA_TRACKING_ID', {
    page_path: path,
  });
};

export const trackEvent = (eventName: string, params?: object): void => {
  window.gtag('event', eventName, params);
};

export const reportError = (error: Error, extraInfo?: object): void => {
  Sentry.captureException(error, { extra: extraInfo });
};
```

### 3. Tracked Events

The following key user interactions are currently tracked:

*   **Page Views**: All route changes are tracked.
*   **Purchase**: A successful course enrollment via the checkout page.
*   **Course Save/Unsave**: When a user bookmarks a course.
*   **Resume Generation**: When the AI Resume Builder is successfully used.
*   **Errors**: Uncaught React component errors are automatically reported via the `ErrorBoundary`.

### 4. Performance Metrics (Web Vitals)

The application includes a placeholder to report Core Web Vitals (LCP, FID, CLS). To enable this, install the `web-vitals` library and uncomment the implementation in `services/analytics.ts`.

```bash
npm install web-vitals
```

```typescript
// services/analytics.ts
import { onCLS, onFID, onLCP, Metric } from 'web-vitals';

export const reportWebVitals = (metric: Metric): void => {
  console.log(`[Analytics] Web Vital: ${metric.name}`, metric);
  // Send to Google Analytics or other service
};

export const initPerformanceMonitoring = (): void => {
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onLCP(reportWebVitals);
};
```

This strategy provides a comprehensive, production-ready framework for understanding user behavior, monitoring application health, and measuring performance.

---

## 🚀 Deployment & Production

This section outlines the strategy for deploying, optimizing, and maintaining the SED platform in a production environment.

### 1. Production Build Optimization

The application is already configured with key production optimizations:

*   **Code Splitting**: The frontend uses `React.lazy` to split the application into smaller chunks. This ensures users only download the code they need for a specific page, leading to faster initial load times.
*   **Backend Compression**: The Express server uses the `compression` middleware to Gzip API responses, significantly reducing the size of data transferred over the network.
*   **Asset Caching**: Hosting platforms like Vercel or Netlify automatically handle caching of static assets (JS, CSS, images) via `Cache-Control` headers, which should be leveraged.
*   **Image Optimization**: Before uploading to S3, images should be compressed and converted to modern formats like WebP to reduce file size without significant quality loss. This can be automated in the upload pipeline.

### 2. CI/CD Pipeline Setup (GitHub Actions)

A Continuous Integration/Continuous Deployment (CI/CD) pipeline automates testing and deployment, ensuring code quality and consistency. Below is a sample workflow for GitHub Actions.

Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy SED Platform

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Backend Dependencies
        run: npm install
        working-directory: ./backend

      # --- LINTING & TESTING (Add your test scripts here) ---
      - name: Run Backend Tests
        run: npm test # Assuming you have a test script
        working-directory: ./backend
        env:
          MONGO_URI: ${{ secrets.MONGO_URI_TEST }} # Use a test database
          JWT_SECRET: ${{ secrets.JWT_SECRET }}

      # --- DEPLOYMENT (Example for Vercel & Render) ---
      # In a real project, you would have separate jobs for frontend and backend deployment.
      
      - name: Deploy Frontend to Vercel
        # This step is often handled automatically by Vercel's GitHub integration.
        # You would connect your repo to Vercel, and it would build/deploy on push to main.
        run: echo "Frontend deployment handled by Vercel integration."

      - name: Deploy Backend to Render
        # Render can use a deploy hook (a unique URL).
        # You would add the hook URL as a secret in GitHub.
        run: |
          if [[ "${{ github.event_name }}" == "push" && "${{ github.ref }}" == "refs/heads/main" ]]; then
            curl "${{ secrets.RENDER_DEPLOY_HOOK_URL }}"
          else
            echo "Not a push to main, skipping backend deploy."
          fi
```

### 3. Database Backup Strategy

Data is the most critical asset. A robust backup strategy is non-negotiable.

*   **Recommendation**: Use **MongoDB Atlas's built-in backup features**.
*   **Cloud Backup**:
    *   Enable **Continuous Cloud Backups**. This allows for Point-in-Time Recovery (PITR), letting you restore the database to any minute within the last 24 hours (or more, depending on your plan).
    *   Configure **Cloud Provider Snapshots**. These are less granular but provide cost-effective, long-term storage of your database at set intervals (e.g., every 6 hours, daily, weekly).
*   **Security**: Ensure that access to backups is tightly controlled via IAM roles in your cloud provider.

### 4. Monitoring & Error Tracking

Proactively identifying and fixing errors is key to a stable application.

*   **Recommendation**: Integrate a third-party service like **Sentry.io**, **LogRocket**, or **Datadog**.
*   **Frontend Integration**: The existing `ErrorBoundary.tsx` is the perfect place to capture React component errors.

**Example Integration with Sentry in `ErrorBoundary.tsx`:**

```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from "@sentry/react"; // Example import
import ErrorPage from '../pages/ErrorPage';

// Sentry.init({ dsn: "YOUR_SENTRY_DSN" }); // Initialize in your app's entry point

class ErrorBoundary extends Component<Props, State> {
  // ... (existing code)

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to your chosen service
    Sentry.captureException(error, { extra: errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  // ... (rest of the component)
}

export default ErrorBoundary;
```

*   **Backend Monitoring**:
    *   Use a logging service (like Winston or Pino) to structure logs.
    *   Integrate Sentry's Node.js SDK to capture unhandled exceptions and performance data from your Express API.
    *   Set up uptime monitoring (e.g., UptimeRobot, Checkly) to get alerted if your API goes down.

---

## 📜 License

This project is proprietary software developed for **SCHOLASTIC A EDU. DEPOT**.
Unauthorized copying or distribution is strictly prohibited.