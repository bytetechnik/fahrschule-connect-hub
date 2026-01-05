// Notifications
export interface Notification {
  id: string;
  userId: string;
  title: string;
  titleEn: string;
  message: string;
  messageEn: string;
  type: 'info' | 'warning' | 'success' | 'reminder';
  read: boolean;
  createdAt: string;
}

export const mockNotifications: Notification[] = [
  { id: 'notif-1', userId: 'student-1', title: 'Theorieprüfung steht bevor', titleEn: 'Theory Exam Soon', message: 'Ihre Theorieprüfung ist in 5 Tagen geplant.', messageEn: 'Your theory exam is scheduled in 5 days.', type: 'reminder', read: false, createdAt: '2025-12-24T10:00:00Z' },
  { id: 'notif-2', userId: 'student-1', title: 'Theoriestunde abgeschlossen', titleEn: 'Lesson Completed', message: 'Sie haben Theoriestunde 8 erfolgreich abgeschlossen!', messageEn: 'You successfully completed lesson 8!', type: 'success', read: true, createdAt: '2025-12-23T14:30:00Z' },
  { id: 'notif-3', userId: 'student-2', title: 'Neuer Fahrstundentermin', titleEn: 'New Appointment', message: 'Ein neuer Fahrstundentermin wurde für Sie gebucht.', messageEn: 'A new driving lesson appointment has been booked for you.', type: 'info', read: false, createdAt: '2025-12-24T08:00:00Z' },
  { id: 'notif-4', userId: 'teacher-1', title: 'Neuer Fahrschüler', titleEn: 'New Student', message: 'Ein neuer Fahrschüler wurde Ihnen zugewiesen.', messageEn: 'A new student has been assigned to you.', type: 'info', read: false, createdAt: '2025-12-23T09:00:00Z' },
  { id: 'notif-5', userId: 'admin', title: 'Systemwartung', titleEn: 'System Maintenance', message: 'Geplante Systemwartung am 28. Dezember.', messageEn: 'Scheduled system maintenance on December 28th.', type: 'warning', read: false, createdAt: '2025-12-22T12:00:00Z' },
];

export const getNotificationsByUser = (userId: string): Notification[] => {
  return mockNotifications.filter(n => n.userId === userId || n.userId === 'all').sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Announcements
export interface Announcement {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: 'all' | 'students' | 'teachers';
  createdAt: string;
  expiresAt?: string;
}

export const mockAnnouncements: Announcement[] = [
  { id: 'ann-1', title: 'Weihnachtsferien', titleEn: 'Christmas Holidays', content: 'Die Fahrschule ist vom 24.12. bis 01.01. geschlossen.', contentEn: 'The driving school is closed from Dec 24 to Jan 1.', priority: 'high', targetAudience: 'all', createdAt: '2025-12-20T10:00:00Z', expiresAt: '2026-01-02T00:00:00Z' },
  { id: 'ann-2', title: 'Neue Theorievideos', titleEn: 'New Theory Videos', content: 'Wir haben neue interaktive Theorievideos hinzugefügt!', contentEn: 'We have added new interactive theory videos!', priority: 'medium', targetAudience: 'students', createdAt: '2025-12-18T14:00:00Z' },
  { id: 'ann-3', title: 'Fahrlehrermeeting', titleEn: 'Teacher Meeting', content: 'Monatliches Fahrlehrermeeting am 27.12. um 9:00 Uhr.', contentEn: 'Monthly teacher meeting on Dec 27 at 9:00 AM.', priority: 'medium', targetAudience: 'teachers', createdAt: '2025-12-21T11:00:00Z' },
];

export const getAnnouncementsByAudience = (audience: 'students' | 'teachers' | 'all'): Announcement[] => {
  const now = new Date();
  return mockAnnouncements.filter(a => 
    (a.targetAudience === 'all' || a.targetAudience === audience) &&
    (!a.expiresAt || new Date(a.expiresAt) > now)
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Student Achievements
export interface Achievement {
  id: string;
  studentId: string;
  type: 'first-lesson' | 'theory-complete' | 'halfway' | 'exam-ready' | 'night-drive' | 'highway-drive' | 'perfect-week';
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  earnedAt: string;
  icon: string;
}

export const mockAchievements: Achievement[] = [
  { id: 'ach-1', studentId: 'student-1', type: 'theory-complete', title: 'Theoriemeister', titleEn: 'Theory Master', description: 'Alle Theoriestunden erfolgreich abgeschlossen', descriptionEn: 'Successfully completed all theory lessons', earnedAt: '2025-12-15T10:00:00Z', icon: '🎓' },
  { id: 'ach-2', studentId: 'student-1', type: 'highway-drive', title: 'Autobahnprofi', titleEn: 'Highway Pro', description: 'Erste Autobahnfahrt erfolgreich gemeistert', descriptionEn: 'Successfully mastered first highway drive', earnedAt: '2025-12-10T14:00:00Z', icon: '🛣️' },
  { id: 'ach-3', studentId: 'student-2', type: 'first-lesson', title: 'Erster Schritt', titleEn: 'First Step', description: 'Erste Fahrstunde erfolgreich absolviert', descriptionEn: 'Successfully completed first driving lesson', earnedAt: '2025-11-20T09:00:00Z', icon: '🚗' },
  { id: 'ach-4', studentId: 'student-3', type: 'halfway', title: 'Halbzeit erreicht!', titleEn: 'Halfway There!', description: '50% der Ausbildung erfolgreich abgeschlossen', descriptionEn: 'Successfully completed 50% of the course', earnedAt: '2025-12-05T16:00:00Z', icon: '⭐' },
  { id: 'ach-5', studentId: 'student-1', type: 'night-drive', title: 'Nachtfahrer', titleEn: 'Night Driver', description: 'Erste Nachtfahrt erfolgreich absolviert', descriptionEn: 'Successfully completed first night drive', earnedAt: '2025-12-08T20:00:00Z', icon: '🌙' },
];

export const getAchievementsByStudent = (studentId: string): Achievement[] => {
  return mockAchievements.filter(a => a.studentId === studentId).sort((a, b) => 
    new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime()
  );
};

