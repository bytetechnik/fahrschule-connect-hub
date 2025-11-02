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
  licenseClass: string;
  joiningDate: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  type: 'theory-app' | 'driving-lesson' | 'theory-exam' | 'practical-exam';
  basePriceByYear: { year: string; price: number }[];
  customPrices?: { studentId: string; price: number }[];
}

export interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  videoUrl: string;
  thumbnail: string;
  videos?: { title: string; url: string }[];
  documents?: { name: string; url: string; type: string }[];
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
  duration: number; // Duration in minutes (45, 90, 135, etc.)
  ticketsUsed: number; // Number of tickets used (1 ticket = 45 minutes)
  status: 'scheduled' | 'cancelled' | 'completed';
  cancelReason?: string; // Required when cancelled by teacher
  cancelledBy?: 'student' | 'teacher'; // Who cancelled the appointment
  createdAt: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
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


// Driving school process tracking
export type StudentProcessMainStep =
  | 'prerequisites'
  | 'registration'
  | 'theory'
  | 'practical';

export interface StudentProcessPrerequisites {
  firstAidCertificate: boolean;
  biometricPhotos: boolean;
  eyeTest: boolean;
}

export interface StudentProcess {
  studentId: string;
  // Which main step the student is currently in
  currentStep: StudentProcessMainStep;
  // Sub-step statuses for prerequisites
  prerequisites: StudentProcessPrerequisites;
  // Optional timestamps
  updatedAt?: string;
}

// Student ticket balance (e.g., practical driving lesson tickets)
export interface StudentTickets {
  studentId: string;
  drivingLessonTickets: number;
}

// Practical Driving Lessons
export interface PracticalLessonTopic {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: 'grundfahraufgabe' | 'sonderfahrt' | 'stadtfahrt' | 'autobahn' | 'ueberland' | 'beleuchtung' | 'parken' | 'other';
}

export interface PracticalLessonRecord {
  id: string;
  teacherId: string;
  studentId: string;
  date: string; // ISO date string
  topicId: string;
  comments?: string;
  createdAt: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
}

