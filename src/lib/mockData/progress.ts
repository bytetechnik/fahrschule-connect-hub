import type { Progress } from '@/types';

const initialProgress: Progress[] = [
  // Student 1 - Jan 2025
  { studentId: 'student-1', lessonId: 'lesson-1', completed: true, completedDate: '2025-01-15' },
  { studentId: 'student-1', lessonId: 'lesson-2', completed: true, completedDate: '2025-01-18' },
  { studentId: 'student-1', lessonId: 'lesson-3', completed: true, completedDate: '2025-01-22' },
  { studentId: 'student-1', lessonId: 'lesson-4', completed: true, completedDate: '2025-01-25' },
  { studentId: 'student-1', lessonId: 'lesson-5', completed: true, completedDate: '2025-01-28' },
  // Student 2 - Feb 2025
  { studentId: 'student-2', lessonId: 'lesson-1', completed: true, completedDate: '2025-02-01' },
  { studentId: 'student-2', lessonId: 'lesson-2', completed: true, completedDate: '2025-02-05' },
  { studentId: 'student-2', lessonId: 'lesson-3', completed: true, completedDate: '2025-02-10' },
  // Student 3 - Nov 2024, Dec 2024
  { studentId: 'student-3', lessonId: 'lesson-1', completed: true, completedDate: '2024-11-05' },
  { studentId: 'student-3', lessonId: 'lesson-2', completed: true, completedDate: '2024-11-12' },
  { studentId: 'student-3', lessonId: 'lesson-3', completed: true, completedDate: '2024-12-03' },
  { studentId: 'student-3', lessonId: 'lesson-4', completed: true, completedDate: '2024-12-10' },
  // Student 5 - Oct 2024
  { studentId: 'student-5', lessonId: 'lesson-1', completed: true, completedDate: '2024-10-08' },
  { studentId: 'student-5', lessonId: 'lesson-2', completed: true, completedDate: '2024-10-15' },
  // Student 8 - Jan 2025, Feb 2025
  { studentId: 'student-8', lessonId: 'lesson-1', completed: true, completedDate: '2025-01-08' },
  { studentId: 'student-8', lessonId: 'lesson-2', completed: true, completedDate: '2025-02-02' },
  // Student 11 - Sep 2024, Oct 2024
  { studentId: 'student-11', lessonId: 'lesson-1', completed: true, completedDate: '2024-09-10' },
  { studentId: 'student-11', lessonId: 'lesson-2', completed: true, completedDate: '2024-10-01' },
  { studentId: 'student-11', lessonId: 'lesson-3', completed: true, completedDate: '2024-10-18' },
  // Student 13 - Mar 2024, Apr 2024
  { studentId: 'student-13', lessonId: 'lesson-1', completed: true, completedDate: '2024-03-20' },
  { studentId: 'student-13', lessonId: 'lesson-2', completed: true, completedDate: '2024-04-05' },
  // Student 14 - Dec 2024
  { studentId: 'student-14', lessonId: 'lesson-1', completed: true, completedDate: '2024-12-01' },
  { studentId: 'student-14', lessonId: 'lesson-2', completed: true, completedDate: '2024-12-15' },
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

