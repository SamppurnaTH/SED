
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
*   **State Management**: React Context API
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
| `SMTP_HOST` | Email Server Host (e.g., smtp.gmail.com) |
| `SMTP_USER` | SMTP Username |
| `SMTP_PASS` | SMTP Password |
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

*   **Authentication**: Role-based access control (Student, Admin, Marketing, Trainer).
*   **Data Integrity**: All inputs sanitized via `express-validator`.
*   **API Protection**:
    *   `helmet` for secure HTTP headers.
    *   `express-rate-limit` to prevent DDoS/Brute-force.
*   **Asset Security**: Direct S3 uploads via backend signed streams; no public write access to bucket.

---

## 🧪 Testing & AI Fallbacks

*   **AI Fallback**: If you do not have a local Ollama instance running, the Chatbot automatically switches to "Cloud Mode" using the Gemini API to answer questions based on database context.
*   **Video Proxy**: The backend streams Veo video previews to the frontend, bypassing CORS and Auth restrictions on the raw Google Cloud URLs.

---

## 📜 License

This project is proprietary software developed for **SCHOLASTIC A EDU. DEPOT**.
Unauthorized copying or distribution is strictly prohibited.
