# 📘 LearnSphere – eLearning Platform

LearnSphere is a modern, role-based eLearning platform designed to deliver a complete digital learning experience for **learners**, **instructors**, and **administrators**.  
The platform focuses on course creation, lesson delivery, quizzes, progress tracking, and a gamified points & badges system.

This project is built as an **academic / hackathon project** with a futuristic dark UI and scalable frontend architecture.

---

## 🚀 Features

### 👩‍🎓 Learner (Student)
- Browse published courses
- Join, start, and continue courses
- Full-screen lesson player (Video / Document / Image / Quiz)
- Attempt quizzes with multiple attempts
- Earn points based on quiz attempt number
- Badge levels based on total points
- Track course progress and completion
- View ratings and reviews

---

### 👨‍🏫 Instructor / Course Manager
- Create and manage courses
- Add lessons (video, document, image)
- Build quizzes with reward rules
- Publish / unpublish courses
- Manage course content
- View learner progress and reporting

---

### 🛠 Admin
- Full access to all instructor features
- Platform-level monitoring and reporting
- Manage courses and users

---

## 🧱 System Modules

### Module A – Instructor / Admin Backoffice
- Courses dashboard (Kanban & List view)
- Course creation and editing
- Lesson and content management
- Quiz builder with configurable rewards
- Course publishing controls
- Reporting dashboard for learner progress

### Module B – Learner Website / App
- Course browsing and discovery
- My Courses dashboard
- Course detail and progress tracking
- Full-screen lesson and quiz player
- Points and badge system

---

## 🎯 Gamification Rules
- Multiple quiz attempts are allowed
- Points decrease with more attempts
- Total points decide badge level:
  - Newbie
  - Explorer
  - Achiever
  - Specialist
  - Expert
  - Master

---

## 🧑‍💻 Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Space Grotesk Font
- Component-based UI architecture

### Backend (Planned / In Progress)
- Firebase / Supabase
- Authentication and role-based access control
- Persistent storage for users, courses, and progress

---
src/
├── components/
│ ├── ui/
│ ├── Navbar.tsx
│ ├── CourseCard.tsx
│ └── LessonItem.tsx
├── layouts/
│ ├── MainLayout.tsx
│ └── AdminLayout.tsx
├── pages/
│ ├── Landing.tsx
│ ├── Courses.tsx
│ ├── CourseDetail.tsx
│ ├── LessonPlayer.tsx
│ ├── AdminDashboard.tsx
│ └── QuizBuilder.tsx
├── context/
│ └── AuthContext.tsx
├── utils/
└── App.tsx


---

## 🔐 User Roles

| Role | Description |
|------|------------|
| Admin | Full platform access |
| Instructor | Create and manage courses |
| Learner | Consume courses and quizzes |

User role controls:
- Visible pages
- Allowed actions
- Access permissions

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/learnsphere.git
cd learnsphere

### 2. Install dependencies
```bash
npm install

### 3. Run the project
```bash
npm run dev

---

## 🧪 Demo Mode
This project currently demonstrates role-based behavior and features using mock data / local storage.
Backend integration is planned for full data persistence and authentication.

---

## 📌 Future Enhancements
- Backend integration (Firebase / Supabase)
- Real authentication and authorization
- Payment gateway for paid courses
- Email invitations for learners
- Advanced analytics and reporting
- Mobile application support

---

## Academic Note
This project is developed for academic and hackathon purposes to demonstrate:

- Role-based system design
- Frontend architecture
- UI/UX principles
- Scalable eLearning platform concepts

