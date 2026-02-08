import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

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
import MyCoursesNew from "@/pages/MyCoursesNew";
import CourseDetailNew from "@/pages/CourseDetailNew";
import CourseDetailModular from "@/pages/CourseDetailModular";
import LessonPlayer from "@/pages/LessonPlayer";
import QuizPlayer from "@/pages/QuizPlayer";
import NotFound from "@/pages/NotFound";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminCoursesNew from "@/pages/admin/AdminCoursesNew";
import AdminAttendees from "@/pages/admin/AdminAttendees";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminHelpSupport from "@/pages/admin/AdminHelpSupport";
import CourseForm from "@/pages/admin/CourseForm";
import CourseReporting from "@/pages/admin/CourseReporting";
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
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<Courses />} />
          </Route>
          
          {/* Protected Routes */}
          <Route element={<MainLayout />}>
            <Route path="/my-courses" element={<ProtectedRoute><MyCoursesNew /></ProtectedRoute>} />
            <Route path="/courses/:id" element={<ProtectedRoute><CourseDetailModular /></ProtectedRoute>} />
          </Route>
          
          {/* Full-screen Players */}
          <Route path="/learn/:courseId/module/:moduleId/topic/:topicId" element={<ProtectedRoute><LessonPlayer /></ProtectedRoute>} />
          <Route path="/learn/:courseId/quiz/:quizId" element={<ProtectedRoute><QuizPlayer /></ProtectedRoute>} />

          {/* Admin Routes - Only Admin & Instructor */}
          <Route path="/admin" element={
            <RoleProtectedRoute allowedRoles={['admin', 'instructor']}>
              <AdminLayout />
            </RoleProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCoursesNew />} />
            <Route path="courses/:id" element={<CourseForm />} />
            <Route path="courses/:id/reporting" element={<CourseReporting />} />
            <Route path="courses/:courseId/quiz/:quizId" element={<QuizBuilder />} />
            <Route path="attendees" element={<AdminAttendees />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="help" element={<AdminHelpSupport />} />
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
