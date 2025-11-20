# 🎓 SCHOLASTIC A EDU. DEPOT (SED) - Next-Gen EdTech Platform

![SED Tech Academy Banner](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop)

[![React](https://img.shields.io/badge/Frontend-React_18-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-forestgreen?logo=mongodb)](https://www.mongodb.com/)
[![AI Powered](https://img.shields.io/badge/AI-Gemini_%2B_Veo-purple?logo=google)](https://ai.google.dev/)
[![AWS S3](https://img.shields.io/badge/Storage-AWS_S3-orange?logo=amazon-aws)](https://aws.amazon.com/s3/)

**SCHOLASTIC A EDU. DEPOT (SED)** is a production-grade Learning Management System (LMS) and Tech Academy platform. It bridges the gap between academic learning and industry demands through AI-driven tools, real-world projects, and a seamless learning experience.

---

## 🚀 Core Platform Features
## 👨‍🎓 Student Experience (LMS)
Course Management: Advanced course discovery, filtering, and categorization.

Interactive Learning:

Built-in LMS lesson player supporting video streams (YouTube & MP4).

Granular progress tracking for lessons and overall course completion.

Interactive live code editors for practical web development courses.

AI-Enhanced Tools:

AI Resume Builder: Generates professional resumes using Gemini 2.5 Flash.

RAG Chatbot: Context-aware AI assistant leveraging Local RAG (Ollama) with a Cloud Fallback mechanism.

eCommerce & User Management:

Secure checkout integrated with Razorpay payment gateway.

Comprehensive user dashboard to manage enrolled courses, order history, and saved items.

---

## 🛠️ Admin & Content Portal (CMS)
Content Management: Full CRUD (Create, Read, Update, Delete) capabilities for Courses, Partners, Services, and Blog Posts.

AI Content Studio: Accelerates content creation and marketing:

Copywriter: Auto-generation of marketing blogs and social media content.

Image Generator: Creates course banners using Gemini 2.5 Flash Image.

Video Studio: Generates promotional videos using Google Veo.

Analytics & Reporting: Real-time visualization of key metrics, including Revenue, Enrollments, and Lead generation.

Lead Management: System to view and export contact form submissions to CSV.

---

## 🏗️ Technical Architecture
The application is built on a Decoupled Monorepo structure (Frontend + Backend) ensuring scalability and maintainability.

Frontend Technology Stack
Framework: React (Vite/CRA) + TypeScript

Design: Tailwind CSS for utility-first styling.

State Management: React Context API & Custom Hooks.

Routing: React Router v6.

Backend API Technology Stack
Runtime: Node.js + Express

Database: MongoDB (Mongoose ODM)

Security: Comprehensive security measures including Helmet, Rate Limiting, JWT Authentication, and Input Validation (express-validator).

Storage: AWS S3 (via Multer) for scalable and durable image hosting.

Communication: Nodemailer (SMTP) for reliable HTML email delivery.

---

## 🤖 AI & RAG Layer
The backend functions as a Secure Proxy for all AI operations, safeguarding API Keys.

Cloud AI Integration: Proxies requests to Google Gemini (Text/Image) and Veo (Video).

Local RAG (Hybrid Strategy):

Primary attempt to utilize a local Ollama instance and ChromaDB for vector search.

Graceful fallback to Cloud Gemini if local AI services are unavailable.

---

## 🧑‍💻 Author
Venu Thota

Python Developer | Data Scientist | ML Engineer | Full Stack Developer | Ethical Hacker Enthusiast | Prompt Engineer

---

## 📜 License

This project is proprietary software developed for **SCHOLASTIC A EDU. DEPOT**.
Unauthorized copying or distribution is strictly prohibited.
