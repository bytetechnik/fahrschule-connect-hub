export interface Teacher {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  teacherId: string;
  validityDate: string;
  status: 'active' | 'expired';
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  videoUrl: string;
  thumbnail: string;
}

export interface Progress {
  studentId: string;
  lessonId: string;
  completed: boolean;
  completedDate?: string;
}

export interface Appointment {
  id: string;
  teacherId: string;
  studentId: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'cancelled';
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending';
  description: string;
}

export interface Discussion {
  id: string;
  lessonId: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
}

export interface TeacherAvailability {
  id: string;
  teacherId: string;
  date: string;
  timeSlots: {
    time: string;
    available: boolean;
    bookedBy?: string;
  }[];
}

export const mockTeachers: Teacher[] = [
  { id: 'teacher-1', name: 'Max Müller', email: 'teacher@fahrschule.de', status: 'active' },
  { id: 'teacher-2', name: 'Julia Schneider', email: 'julia.schneider@fahrschule.de', status: 'active' },
  { id: 'teacher-3', name: 'Thomas Bauer', email: 'thomas.bauer@fahrschule.de', status: 'active' }
];

export const mockStudents: Student[] = [
  { id: 'student-1', name: 'Anna Schmidt', email: 'student@fahrschule.de', teacherId: 'teacher-1', validityDate: '2025-12-31', status: 'active', progress: 100 },
  { id: 'student-2', name: 'Lucas Weber', email: 'lucas.weber@example.com', teacherId: 'teacher-1', validityDate: '2025-11-30', status: 'active', progress: 50 },
  { id: 'student-3', name: 'Emma Meyer', email: 'emma.meyer@example.com', teacherId: 'teacher-2', validityDate: '2026-01-15', status: 'active', progress: 75 },
  { id: 'student-4', name: 'Noah Wagner', email: 'noah.wagner@example.com', teacherId: 'teacher-2', validityDate: '2025-10-20', status: 'active', progress: 25 },
  { id: 'student-5', name: 'Mia Fischer', email: 'mia.fischer@example.com', teacherId: 'teacher-3', validityDate: '2025-12-15', status: 'active', progress: 60 },
  { id: 'student-6', name: 'Leon Becker', email: 'leon.becker@example.com', teacherId: 'teacher-3', validityDate: '2025-09-30', status: 'active', progress: 40 }
];

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Verkehrsregeln und Vorfahrt',
    titleEn: 'Traffic Rules and Right of Way',
    description: 'Grundlegende Verkehrsregeln und Vorfahrtsregelungen im Straßenverkehr',
    descriptionEn: 'Basic traffic rules and right of way regulations in road traffic',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=225&fit=crop'
  },
  {
    id: 'lesson-2',
    title: 'Verkehrszeichen und Signale',
    titleEn: 'Traffic Signs and Signals',
    description: 'Bedeutung und Interpretation von Verkehrszeichen und Ampelsignalen',
    descriptionEn: 'Meaning and interpretation of traffic signs and traffic light signals',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=225&fit=crop'
  },
  {
    id: 'lesson-3',
    title: 'Geschwindigkeit und Sicherheitsabstand',
    titleEn: 'Speed and Safety Distance',
    description: 'Angemessene Geschwindigkeit und Sicherheitsabstände im Straßenverkehr',
    descriptionEn: 'Appropriate speed and safety distances in road traffic',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=225&fit=crop'
  },
  {
    id: 'lesson-4',
    title: 'Fahren bei Nacht und schlechtem Wetter',
    titleEn: 'Driving at Night and in Bad Weather',
    description: 'Besondere Vorsichtsmaßnahmen bei Dunkelheit und widrigen Wetterbedingungen',
    descriptionEn: 'Special precautions in darkness and adverse weather conditions',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop'
  },
  {
    id: 'lesson-5',
    title: 'Notfallsituationen und Erste Hilfe',
    titleEn: 'Emergency Situations and First Aid',
    description: 'Richtiges Verhalten in Notfällen und Erste-Hilfe-Maßnahmen',
    descriptionEn: 'Correct behavior in emergencies and first aid measures',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&h=225&fit=crop'
  }
];

const initialProgress: Progress[] = [
  { studentId: 'student-1', lessonId: 'lesson-1', completed: true, completedDate: '2025-01-15' },
  { studentId: 'student-1', lessonId: 'lesson-2', completed: true, completedDate: '2025-01-18' },
  { studentId: 'student-1', lessonId: 'lesson-3', completed: true, completedDate: '2025-01-22' },
  { studentId: 'student-1', lessonId: 'lesson-4', completed: true, completedDate: '2025-01-25' },
  { studentId: 'student-1', lessonId: 'lesson-5', completed: true, completedDate: '2025-01-28' },
  { studentId: 'student-2', lessonId: 'lesson-1', completed: true, completedDate: '2025-02-01' },
  { studentId: 'student-2', lessonId: 'lesson-2', completed: true, completedDate: '2025-02-05' },
  { studentId: 'student-2', lessonId: 'lesson-3', completed: true, completedDate: '2025-02-10' },
];

const initialAppointments: Appointment[] = [
  { id: 'apt-1', teacherId: 'teacher-1', studentId: 'student-1', date: '2025-02-15', time: '10:00', status: 'approved' },
  { id: 'apt-2', teacherId: 'teacher-1', studentId: 'student-2', date: '2025-02-16', time: '14:00', status: 'pending' },
  { id: 'apt-3', teacherId: 'teacher-2', studentId: 'student-3', date: '2025-02-17', time: '11:00', status: 'approved' },
  { id: 'apt-4', teacherId: 'teacher-1', studentId: 'student-1', date: '2025-01-20', time: '15:00', status: 'approved' },
];

const initialPayments: Payment[] = [
  { id: 'pay-1', studentId: 'student-1', amount: 450, date: '2025-01-10', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-2', studentId: 'student-2', amount: 450, date: '2025-01-15', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-3', studentId: 'student-3', amount: 450, date: '2025-01-20', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-4', studentId: 'student-1', amount: 200, date: '2025-02-01', status: 'paid', description: 'Fahrstunden Paket 1' },
];

const initialDiscussions: Discussion[] = [
  {
    id: 'disc-1',
    lessonId: 'lesson-1',
    userId: 'student-1',
    userName: 'Anna Schmidt',
    message: 'Sehr informative Lektion! Ich habe eine Frage zur Vorfahrt an Kreuzungen.',
    timestamp: '2025-01-15T14:30:00'
  },
  {
    id: 'disc-2',
    lessonId: 'lesson-1',
    userId: 'teacher-1',
    userName: 'Max Müller',
    message: 'Gute Frage! An einer Kreuzung gilt: Rechts vor links, sofern keine Verkehrszeichen anderes bestimmen.',
    timestamp: '2025-01-15T15:00:00'
  }
];

export const getProgress = (): Progress[] => {
  const stored = localStorage.getItem('progress');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('progress', JSON.stringify(initialProgress));
  return initialProgress;
};

export const saveProgress = (progress: Progress[]) => {
  localStorage.setItem('progress', JSON.stringify(progress));
};

export const getAppointments = (): Appointment[] => {
  const stored = localStorage.getItem('appointments');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('appointments', JSON.stringify(initialAppointments));
  return initialAppointments;
};

export const saveAppointments = (appointments: Appointment[]) => {
  localStorage.setItem('appointments', JSON.stringify(appointments));
};

export const getPayments = (): Payment[] => {
  const stored = localStorage.getItem('payments');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('payments', JSON.stringify(initialPayments));
  return initialPayments;
};

export const savePayments = (payments: Payment[]) => {
  localStorage.setItem('payments', JSON.stringify(payments));
};

export const getDiscussions = (): Discussion[] => {
  const stored = localStorage.getItem('discussions');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('discussions', JSON.stringify(initialDiscussions));
  return initialDiscussions;
};

export const saveDiscussions = (discussions: Discussion[]) => {
  localStorage.setItem('discussions', JSON.stringify(discussions));
};

const initialAvailability: TeacherAvailability[] = [
  {
    id: 'avail-1',
    teacherId: 'teacher-1',
    date: '2025-02-15',
    timeSlots: [
      { time: '09:00', available: false, bookedBy: 'student-1' },
      { time: '10:00', available: true },
      { time: '11:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
      { time: '16:00', available: true },
    ]
  },
  {
    id: 'avail-2',
    teacherId: 'teacher-1',
    date: '2025-02-16',
    timeSlots: [
      { time: '09:00', available: true },
      { time: '10:00', available: false, bookedBy: 'student-2' },
      { time: '11:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
    ]
  },
  {
    id: 'avail-3',
    teacherId: 'teacher-2',
    date: '2025-02-15',
    timeSlots: [
      { time: '10:00', available: true },
      { time: '11:00', available: true },
      { time: '13:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: true },
    ]
  }
];

export const getAvailability = (): TeacherAvailability[] => {
  const stored = localStorage.getItem('availability');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('availability', JSON.stringify(initialAvailability));
  return initialAvailability;
};

export const saveAvailability = (availability: TeacherAvailability[]) => {
  localStorage.setItem('availability', JSON.stringify(availability));
};
