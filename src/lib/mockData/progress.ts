import type { Progress } from '@/types';

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

