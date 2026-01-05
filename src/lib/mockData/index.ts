// Re-export all types
export type {
  Teacher,
  Student,
  Product,
  Lesson,
  Progress,
  Appointment,
  Payment,
  Discussion,
  TeacherAvailability,
  StudentProcess,
  StudentTickets,
  PracticalLessonTopic,
  PracticalLessonRecord,
} from '@/types';

// Re-export from students
export {
  mockStudents,
  getStudents,
  saveStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './students';

// Re-export from teachers
export {
  mockTeachers,
  getTeachers,
  saveTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from './teachers';

// Re-export from lessons
export {
  mockLessons,
  getLessons,
  saveLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from './lessons';

// Re-export from appointments
export {
  getAppointments,
  saveAppointments,
  createAppointment,
  cancelAppointment,
  updateAppointment,
  deleteAppointment,
  completeAppointment,
} from './appointments';

// Re-export from payments
export {
  getPayments,
  savePayments,
} from './payments';

// Re-export from products
export {
  getProducts,
  saveProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductPriceForStudent,
} from './products';

// Re-export from progress
export {
  getProgress,
  saveProgress,
} from './progress';

// Re-export from discussions
export {
  getDiscussions,
  saveDiscussions,
} from './discussions';

// Re-export from availability
export {
  getAvailability,
  saveAvailability,
  clearAvailability,
} from './availability';

// Re-export from tickets
export {
  getStudentTickets,
  saveStudentTickets,
  getDrivingLessonTicketsForStudent,
  addDrivingLessonTickets,
  consumeDrivingLessonTickets,
} from './tickets';

// Re-export from practicalLessons
export {
  mockPracticalLessonTopics,
  getPracticalLessonTopics,
  savePracticalLessonTopics,
  createPracticalLessonTopic,
  updatePracticalLessonTopic,
  deletePracticalLessonTopic,
  getPracticalLessonRecords,
  savePracticalLessonRecords,
  createPracticalLessonRecord,
  updatePracticalLessonRecord,
  deletePracticalLessonRecord,
  getPracticalLessonRecordsByStudent,
  getPracticalLessonRecordsByTeacher,
  getPracticalLessonRecordsByDate,
} from './practicalLessons';

// Re-export from studentProcess
export {
  getStudentProcesses,
  saveStudentProcesses,
  getStudentProcessByStudentId,
  updateStudentProcess,
} from './studentProcess';

// Re-export from messaging
export {
  mockConversations,
  mockMessages,
  getConversationsForUser,
  getMessagesForConversation,
  sendMessage,
  markConversationAsRead,
  createConversation,
  getParticipantInfo,
  getUnreadMessageCount,
  getUserOnlineStatus,
  setUserOnline,
  setUserOffline,
  setTypingStatus,
  getTypingUsers,
  formatLastSeen,
  type Conversation,
  type Message,
  type OnlineStatus,
  type TypingStatus,
} from './messaging';

// Re-export from notifications
export {
  mockNotifications,
  getNotificationsByUser,
  mockAnnouncements,
  getAnnouncementsByAudience,
  mockAchievements,
  getAchievementsByStudent,
  type Notification,
  type Announcement,
  type Achievement,
} from './notifications';

// Re-export from analytics
export {
  mockActivityLogs,
  getRecentActivityLogs,
  mockRevenueData,
  getWeeklyProgressByStudent,
  getTeacherMetrics,
  mockUpcomingExams,
  type ActivityLog,
  type RevenueData,
  type WeeklyProgress,
  type TeacherMetrics,
  type UpcomingExam,
} from './analytics';

// Re-export validation functions
export {
  validateAllData,
  validateStudentData,
  validateTeacherData,
  formatValidationResults,
  logValidationResults,
  type ValidationResult,
  type ValidationError,
} from '../validation/dataValidation';

