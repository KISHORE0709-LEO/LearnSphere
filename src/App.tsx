import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import { MainLayout } from "@/components/layout/MainLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

// Public Pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import ForgotPassword from "@/pages/ForgotPassword";
import Courses from "@/pages/Courses";
import MyCourses from "@/pages/MyCourses";
import CourseDetail from "@/pages/CourseDetail";
import LessonPlayer from "@/pages/LessonPlayer";
import QuizPlayer from "@/pages/QuizPlayer";
import NotFound from "@/pages/NotFound";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminCoursesNew from "@/pages/admin/AdminCoursesNew";
import AdminAttendees from "@/pages/admin/AdminAttendees";
import AdminSettings from "@/pages/admin/AdminSettings";
import CourseForm from "@/pages/admin/CourseForm";
import AdminReporting from "@/pages/admin/AdminReporting";
import QuizBuilder from "@/pages/admin/QuizBuilder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />

          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
          </Route>
          
          {/* Full-screen Players */}
          <Route path="/learn/:courseId/lesson/:lessonId" element={<LessonPlayer />} />
          <Route path="/learn/:courseId/quiz/:quizId" element={<QuizPlayer />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCoursesNew />} />
            <Route path="courses/:id" element={<CourseForm />} />
            <Route path="courses/:courseId/quiz/:quizId" element={<QuizBuilder />} />
            <Route path="attendees" element={<AdminAttendees />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="reporting" element={<AdminReporting />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
