
# SCHOLASTIC A EDU. DEPOT (SED) - Tech Training Academy

![SED Tech Academy Homepage](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop)

This repository contains the source code for a modern, premium-quality web application for **SCHOLASTIC A EDU. DEPOT**, a fictional tech training academy that trains students for IT jobs through industry-focused courses, real-time projects, and placement support.

---

## ✨ Features

The application is split into two main sections: a feature-rich public-facing website and a comprehensive admin portal for content management.

### 🎓 User-Facing Features

- **Fully Responsive Design:** A seamless experience across desktops, tablets, and mobile devices.
- **Dynamic Homepage:** Featuring a hero section with animated counters, partner logo carousel, and course highlights.
- **Detailed Program Pages:** In-depth information for each course, including curriculum, projects, instructor bios, pricing, and FAQs.
- **Interactive Course Demos:** A live code editor for select courses to give prospective students a hands-on feel.
- **Save Courses:** Users can bookmark their favorite courses for easy access later.
- **Student Authentication:** Secure login, registration, and password management flows.
- **Personalized Dashboard:** A dedicated dashboard for logged-in students to view their saved courses.
- **AI-Powered Contact Form:** An intelligent contact form that uses the Gemini API to provide instant, helpful auto-replies.
- **Partners & Services:** Dedicated pages to browse hiring partners and corporate services.
- **Robust Navigation & SEO:** Built with React Router for seamless navigation and designed with SEO best practices in mind.

### 🔑 Admin Portal Features

- **Secure Admin Login:** Separate, secure login for administrators.
- **High-Level Dashboard:** An at-a-glance view of key metrics like the number of courses, partners, services, and contact submissions.
- **Full CRUD Functionality:**
    - **Course Management:** Add, edit, and delete courses with an extensive form covering all details from curriculum to instructor bios.
    - **Partner Management:** Manage the list of hiring partners.
    - **Service Management:** Add, edit, and delete corporate services offered by the academy.
- **AI-Powered Image Generation:** Generate course banner images directly from the course creation form using the Gemini API.
- **View Submissions:** View all contact form submissions in a clean, tabular format.
- **Export to CSV:** Easily export all contact submissions to a CSV file for lead management.

---

## 🚀 Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **State Management:** React Context API
- **AI Integration:** [Google Gemini API](https://ai.google.dev/gemini-api)
- **Build Tool:** [Vite](https://vitejs.dev/)

---

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- `npm` or `yarn` package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/scholastic-a-edu-depot.git
    cd scholastic-a-edu-depot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    The application requires an API key for the Google Gemini API. This key is used for the AI-powered contact form and image generation features.

    - Create a `.env` file in the root of the project.
    - Add your API key to the file:
      ```
      API_KEY=your_google_gemini_api_key_here
      ```
    - You can obtain a key from the [Google AI Studio](https://aistudio.google.com/).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Build for Production

To create a production-ready build of the app:

```bash
npm run build
```
The optimized files will be located in the `dist/` directory.

---

## 📂 Project Structure

The project follows a standard React application structure:

```
src/
├── components/   # Reusable UI components (e.g., Header, CourseCard)
├── contexts/     # React Context providers for global state
├── pages/        # Top-level page components (e.g., HomePage, AdminDashboardPage)
├── constants/    # Static data and constants
├── types.ts      # TypeScript type definitions
├── App.tsx       # Main application component with routing
└── index.tsx     # Application entry point
```

---

## Credentials for Demo

You can use the following credentials to test the application's authentication flows.

### Student Access

-   **Email:** Use any valid email format (e.g., `student@example.com`).
-   **Password:** Use any password.

### Admin Access

-   **Email:** `admin@sed.com`
-   **Password:** `adminpassword123`

Navigate to `/login` and use these credentials to access the admin portal.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
