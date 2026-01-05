import type { Student } from '@/types';

export const mockStudents: Student[] = [
  { 
    id: 'student-1', 
    name: 'Anna Schmidt', 
    email: 'anna.schmidt@example.com', 
    phone: '+49 30 12345678',
    address: 'Hauptstraße 42, 10115 Berlin',
    teacherId: 'teacher-1', 
    validityDate: '2025-12-31', 
    status: 'active', 
    progress: 100, 
    licenseClass: 'B', 
    joiningDate: '2022-08-15' 
  },
  { 
    id: 'student-2', 
    name: 'Lucas Weber', 
    email: 'lucas.weber@example.com', 
    phone: '+49 89 98765432',
    address: 'Marienplatz 8, 80331 München',
    teacherId: 'teacher-1', 
    validityDate: '2025-11-30', 
    status: 'active', 
    progress: 68, 
    licenseClass: 'B', 
    joiningDate: '2023-11-20' 
  },
  { 
    id: 'student-3', 
    name: 'Emma Meyer', 
    email: 'emma.meyer@example.com', 
    phone: '+49 221 45678901',
    address: 'Domstraße 15, 50667 Köln',
    teacherId: 'teacher-2', 
    validityDate: '2026-01-15', 
    status: 'active', 
    progress: 82, 
    licenseClass: 'A2', 
    joiningDate: '2023-05-10' 
  },
  { 
    id: 'student-4', 
    name: 'Noah Wagner', 
    email: 'noah.wagner@example.com', 
    phone: '+49 40 23456789',
    address: 'Speicherstadt 3, 20457 Hamburg',
    teacherId: 'teacher-2', 
    validityDate: '2024-10-20', 
    status: 'expired', 
    progress: 34, 
    licenseClass: 'BE', 
    joiningDate: '2024-01-05' 
  },
  { 
    id: 'student-5', 
    name: 'Mia Fischer', 
    email: 'mia.fischer@example.com', 
    phone: '+49 711 34567890',
    address: 'Königstraße 27, 70173 Stuttgart',
    teacherId: 'teacher-3', 
    validityDate: '2025-12-15', 
    status: 'active', 
    progress: 91, 
    licenseClass: 'A', 
    joiningDate: '2023-09-12' 
  },
  { 
    id: 'student-6', 
    name: 'Leon Becker', 
    email: 'leon.becker@example.com', 
    phone: '+49 69 56789012',
    address: 'Zeil 123, 60313 Frankfurt am Main',
    teacherId: 'teacher-3', 
    validityDate: '2025-09-30', 
    status: 'active', 
    progress: 45, 
    licenseClass: 'C1', 
    joiningDate: '2024-07-18' 
  },
  { 
    id: 'student-7', 
    name: 'Sophia Müller', 
    email: 'sophia.mueller@example.com', 
    phone: '+49 351 67890123',
    address: 'Altmarkt 5, 01067 Dresden',
    teacherId: 'teacher-1', 
    validityDate: '2024-03-15', 
    status: 'expired', 
    progress: 12, 
    licenseClass: 'B', 
    joiningDate: '2024-11-22' 
  },
  { 
    id: 'student-8', 
    name: 'Max Hoffmann', 
    email: 'max.hoffmann@example.com', 
    phone: '+49 421 78901234',
    address: 'Am Markt 11, 28195 Bremen',
    teacherId: 'teacher-2', 
    validityDate: '2026-02-28', 
    status: 'active', 
    progress: 76, 
    licenseClass: 'A1', 
    joiningDate: '2023-12-08' 
  },
  { 
    id: 'student-9', 
    name: 'Lina Schneider', 
    email: 'lina.schneider@example.com', 
    phone: '+49 30 89012345',
    address: 'Friedrichstraße 156, 10117 Berlin',
    teacherId: 'teacher-3', 
    validityDate: '2025-08-10', 
    status: 'active', 
    progress: 57, 
    licenseClass: 'B', 
    joiningDate: '2024-04-03' 
  },
  { 
    id: 'student-10', 
    name: 'Felix Klein', 
    email: 'felix.klein@example.com', 
    phone: '+49 89 90123456',
    address: 'Maximilianstraße 35, 80539 München',
    teacherId: 'teacher-1', 
    validityDate: '2025-11-05', 
    status: 'active', 
    progress: 23, 
    licenseClass: 'BE', 
    joiningDate: '2024-12-14' 
  },
  { 
    id: 'student-11', 
    name: 'Hannah Wolf', 
    email: 'hannah.wolf@example.com', 
    phone: '+49 221 01234567',
    address: 'Hohe Straße 89, 50667 Köln',
    teacherId: 'teacher-2', 
    validityDate: '2026-03-20', 
    status: 'active', 
    progress: 89, 
    licenseClass: 'A', 
    joiningDate: '2023-07-25' 
  },
  { 
    id: 'student-12', 
    name: 'Jonas Zimmermann', 
    email: 'jonas.zimmermann@example.com', 
    phone: '+49 40 12345098',
    address: 'Jungfernstieg 16, 20354 Hamburg',
    teacherId: 'teacher-3', 
    validityDate: '2024-06-30', 
    status: 'expired', 
    progress: 19, 
    licenseClass: 'B', 
    joiningDate: '2024-10-30' 
  },
  { 
    id: 'student-13', 
    name: 'Laura Koch', 
    email: 'laura.koch@example.com', 
    phone: '+49 30 23456789',
    address: 'Unter den Linden 77, 10117 Berlin',
    teacherId: 'teacher-1', 
    validityDate: '2025-10-25', 
    status: 'active', 
    progress: 55, 
    licenseClass: 'B', 
    joiningDate: '2024-02-14' 
  },
  { 
    id: 'student-14', 
    name: 'Tim Schulz', 
    email: 'tim.schulz@example.com', 
    phone: '+49 89 34567890',
    address: 'Neuhauser Straße 28, 80331 München',
    teacherId: 'teacher-2', 
    validityDate: '2026-04-12', 
    status: 'active', 
    progress: 73, 
    licenseClass: 'A2', 
    joiningDate: '2023-10-05' 
  },
  { 
    id: 'student-15', 
    name: 'Sarah Bauer', 
    email: 'sarah.bauer@example.com', 
    phone: '+49 221 45678912',
    address: 'Schildergasse 45, 50667 Köln',
    teacherId: 'teacher-3', 
    validityDate: '2025-07-18', 
    status: 'active', 
    progress: 38, 
    licenseClass: 'B', 
    joiningDate: '2024-08-20' 
  }
];

export const getStudents = (): Student[] => {
  const stored = localStorage.getItem('students');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('students', JSON.stringify(mockStudents));
  return mockStudents;
};

export const saveStudents = (students: Student[]) => {
  localStorage.setItem('students', JSON.stringify(students));
};

export const createStudent = (student: Omit<Student, 'id'>): Student => {
  const students = getStudents();
  const newStudent: Student = {
    ...student,
    id: `student-${Date.now()}`,
  };
  students.push(newStudent);
  saveStudents(students);
  return newStudent;
};

export const updateStudent = (id: string, updates: Partial<Student>): Student | null => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  students[index] = { ...students[index], ...updates };
  saveStudents(students);
  return students[index];
};

export const deleteStudent = (id: string): boolean => {
  const students = getStudents();
  const filtered = students.filter(s => s.id !== id);
  if (filtered.length === students.length) return false;
  
  saveStudents(filtered);
  return true;
};

