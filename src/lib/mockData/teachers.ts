import type { Teacher } from '@/types';

export const mockTeachers: Teacher[] = [
  { id: 'teacher-1', name: 'Max Müller', email: 'teacher@fahrschule.de', status: 'active' },
  { id: 'teacher-2', name: 'Julia Schneider', email: 'julia.schneider@fahrschule.de', status: 'active' },
  { id: 'teacher-3', name: 'Thomas Bauer', email: 'thomas.bauer@fahrschule.de', status: 'active' }
];

export const getTeachers = (): Teacher[] => {
  const stored = localStorage.getItem('teachers');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('teachers', JSON.stringify(mockTeachers));
  return mockTeachers;
};

export const saveTeachers = (teachers: Teacher[]) => {
  localStorage.setItem('teachers', JSON.stringify(teachers));
};

export const createTeacher = (teacher: Omit<Teacher, 'id'>): Teacher => {
  const teachers = getTeachers();
  const newTeacher: Teacher = {
    ...teacher,
    id: `teacher-${Date.now()}`,
  };
  teachers.push(newTeacher);
  saveTeachers(teachers);
  return newTeacher;
};

export const updateTeacher = (id: string, updates: Partial<Teacher>): Teacher | null => {
  const teachers = getTeachers();
  const index = teachers.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  teachers[index] = { ...teachers[index], ...updates };
  saveTeachers(teachers);
  return teachers[index];
};

export const deleteTeacher = (id: string): boolean => {
  const teachers = getTeachers();
  const filtered = teachers.filter(t => t.id !== id);
  if (filtered.length === teachers.length) return false;
  
  saveTeachers(filtered);
  return true;
};

