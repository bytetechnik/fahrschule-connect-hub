import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminStudents from "./pages/admin/Students";
import AdminTeachers from "./pages/admin/Teachers";
import AdminLessons from "./pages/admin/Lessons";
import AdminLessonDetail from "./pages/admin/LessonDetail";
import AdminCalendar from "./pages/admin/Calendar";
import AdminPayments from "./pages/admin/Payments";
import AdminShop from "./pages/admin/Shop";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherStudents from "./pages/teacher/Students";
import TeacherCalendar from "./pages/teacher/Calendar";
import TeacherAppointments from "./pages/teacher/Appointments";
import TeacherPayments from "./pages/teacher/Payments";
import StudentDashboard from "./pages/student/Dashboard";
import StudentLessons from "./pages/student/Lessons";
import StudentLessonDetail from "./pages/student/LessonDetail";
import StudentCalendar from "./pages/student/Calendar";
import StudentAppointments from "./pages/student/Appointments";
import StudentPayments from "./pages/student/Payments";
import StudentShop from "./pages/student/Shop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/students" element={<ProtectedRoute allowedRoles={['admin']}><AdminStudents /></ProtectedRoute>} />
              <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={['admin']}><AdminTeachers /></ProtectedRoute>} />
              <Route path="/admin/lessons" element={<ProtectedRoute allowedRoles={['admin']}><AdminLessons /></ProtectedRoute>} />
              <Route path="/admin/lessons/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminLessonDetail /></ProtectedRoute>} />
              <Route path="/admin/calendar" element={<ProtectedRoute allowedRoles={['admin']}><AdminCalendar /></ProtectedRoute>} />
              <Route path="/admin/payments" element={<ProtectedRoute allowedRoles={['admin']}><AdminPayments /></ProtectedRoute>} />
              <Route path="/admin/shop" element={<ProtectedRoute allowedRoles={['admin']}><AdminShop /></ProtectedRoute>} />
              
              <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
              <Route path="/teacher/students" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherStudents /></ProtectedRoute>} />
              <Route path="/teacher/calendar" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherCalendar /></ProtectedRoute>} />
              <Route path="/teacher/appointments" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherAppointments /></ProtectedRoute>} />
              <Route path="/teacher/payments" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherPayments /></ProtectedRoute>} />
              
              <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
              <Route path="/student/lessons" element={<ProtectedRoute allowedRoles={['student']}><StudentLessons /></ProtectedRoute>} />
              <Route path="/student/lessons/:id" element={<ProtectedRoute allowedRoles={['student']}><StudentLessonDetail /></ProtectedRoute>} />
              <Route path="/student/calendar" element={<ProtectedRoute allowedRoles={['student']}><StudentCalendar /></ProtectedRoute>} />
              <Route path="/student/appointments" element={<ProtectedRoute allowedRoles={['student']}><StudentAppointments /></ProtectedRoute>} />
              <Route path="/student/payments" element={<ProtectedRoute allowedRoles={['student']}><StudentPayments /></ProtectedRoute>} />
              <Route path="/student/shop" element={<ProtectedRoute allowedRoles={['student']}><StudentShop /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
