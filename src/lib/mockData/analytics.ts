import { mockStudents } from './students';

// Activity Log
export interface ActivityLog {
  id: string;
  userId: string;
  userType: 'admin' | 'teacher' | 'student';
  action: string;
  actionEn: string;
  details: string;
  detailsEn: string;
  createdAt: string;
}

export const mockActivityLogs: ActivityLog[] = [
  { id: 'log-1', userId: 'admin', userType: 'admin', action: 'Fahrschüler hinzugefügt', actionEn: 'Added Student', details: 'Neuer Fahrschüler Leon Becker wurde registriert', detailsEn: 'New student Leon Becker registered', createdAt: '2025-12-24T11:30:00Z' },
  { id: 'log-2', userId: 'teacher-1', userType: 'teacher', action: 'Fahrstunde abgeschlossen', actionEn: 'Completed Lesson', details: 'Fahrstunde mit Anna Schmidt abgeschlossen', detailsEn: 'Driving lesson with Anna Schmidt completed', createdAt: '2025-12-24T10:00:00Z' },
  { id: 'log-3', userId: 'student-1', userType: 'student', action: 'Theoriestunde abgeschlossen', actionEn: 'Completed Theory', details: 'Theoriestunde 14 erfolgreich abgeschlossen', detailsEn: 'Successfully completed theory lesson 14', createdAt: '2025-12-23T15:00:00Z' },
  { id: 'log-4', userId: 'admin', userType: 'admin', action: 'Zahlung verarbeitet', actionEn: 'Payment Processed', details: 'Zahlung von Lucas Weber erhalten und verbucht', detailsEn: 'Payment received and processed from Lucas Weber', createdAt: '2025-12-23T09:00:00Z' },
  { id: 'log-5', userId: 'teacher-2', userType: 'teacher', action: 'Termin erstellt', actionEn: 'Appointment Created', details: 'Neuer Fahrstundentermin mit Emma Meyer erstellt', detailsEn: 'New driving lesson appointment created with Emma Meyer', createdAt: '2025-12-22T14:30:00Z' },
  { id: 'log-6', userId: 'admin', userType: 'admin', action: 'Fahrlehrer aktiviert', actionEn: 'Teacher Activated', details: 'Fahrlehrer Thomas Bauer wurde als aktiv markiert', detailsEn: 'Teacher Thomas Bauer marked as active', createdAt: '2025-12-22T08:00:00Z' },
];

export const getRecentActivityLogs = (limit: number = 10): ActivityLog[] => {
  return mockActivityLogs.slice(0, limit).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Revenue data for charts
export interface RevenueData {
  month: string;
  monthEn: string;
  revenue: number;
  students: number;
}

export const mockRevenueData: RevenueData[] = [
  { month: 'Jan', monthEn: 'Jan', revenue: 12500, students: 15 },
  { month: 'Feb', monthEn: 'Feb', revenue: 14200, students: 18 },
  { month: 'Mär', monthEn: 'Mar', revenue: 15800, students: 20 },
  { month: 'Apr', monthEn: 'Apr', revenue: 13600, students: 17 },
  { month: 'Mai', monthEn: 'May', revenue: 16400, students: 22 },
  { month: 'Jun', monthEn: 'Jun', revenue: 18200, students: 25 },
  { month: 'Jul', monthEn: 'Jul', revenue: 17500, students: 23 },
  { month: 'Aug', monthEn: 'Aug', revenue: 14800, students: 19 },
  { month: 'Sep', monthEn: 'Sep', revenue: 19200, students: 28 },
  { month: 'Okt', monthEn: 'Oct', revenue: 21500, students: 32 },
  { month: 'Nov', monthEn: 'Nov', revenue: 18900, students: 26 },
  { month: 'Dez', monthEn: 'Dec', revenue: 16700, students: 21 },
];

// Weekly progress for students
export interface WeeklyProgress {
  week: string;
  theoryHours: number;
  practicalHours: number;
}

export const getWeeklyProgressByStudent = (studentId: string): WeeklyProgress[] => {
  // Generate dummy weekly progress data
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
  return weeks.map((week, idx) => ({
    week,
    theoryHours: Math.floor(Math.random() * 4) + 1,
    practicalHours: Math.floor(Math.random() * 3) + (idx > 3 ? 2 : 0),
  }));
};

// Teacher performance metrics
export interface TeacherMetrics {
  teacherId: string;
  totalLessonsGiven: number;
  averageRating: number;
  passRate: number;
  activeStudents: number;
}

export const getTeacherMetrics = (teacherId: string): TeacherMetrics => {
  const activeStudents = mockStudents.filter(s => s.teacherId === teacherId).length;
  return {
    teacherId,
    totalLessonsGiven: Math.floor(Math.random() * 200) + 100,
    averageRating: parseFloat((4 + Math.random()).toFixed(1)),
    passRate: Math.floor(Math.random() * 15) + 85,
    activeStudents,
  };
};

// Upcoming exams
export interface UpcomingExam {
  id: string;
  studentId: string;
  studentName: string;
  type: 'theory' | 'practical';
  date: string;
  time: string;
  status: 'scheduled' | 'passed' | 'failed';
}

export const mockUpcomingExams: UpcomingExam[] = [
  { id: 'exam-1', studentId: 'student-1', studentName: 'Anna Schmidt', type: 'practical', date: '2025-12-28', time: '09:00', status: 'scheduled' },
  { id: 'exam-2', studentId: 'student-2', studentName: 'Lucas Weber', type: 'theory', date: '2025-12-30', time: '10:30', status: 'scheduled' },
  { id: 'exam-3', studentId: 'student-3', studentName: 'Emma Meyer', type: 'theory', date: '2026-01-05', time: '11:00', status: 'scheduled' },
  { id: 'exam-4', studentId: 'student-4', studentName: 'Noah Wagner', type: 'theory', date: '2026-01-08', time: '14:00', status: 'scheduled' },
];

