import type { Discussion } from '@/types';

const initialDiscussions: Discussion[] = [
  {
    id: 'disc-1',
    lessonId: 'lesson-1',
    userId: 'student-1',
    userName: 'Anna Schmidt',
    message: 'Sehr informative Unterrichtseinheit! Ich habe eine Frage zur Vorfahrt an Kreuzungen.',
    timestamp: '2025-01-15T14:30:00'
  },
  {
    id: 'disc-2',
    lessonId: 'lesson-1',
    userId: 'teacher-1',
    userName: 'Max Müller',
    message: 'Gute Frage! An einer Kreuzung gilt grundsätzlich: Rechts vor links, sofern keine Verkehrszeichen etwas anderes bestimmen.',
    timestamp: '2025-01-15T15:00:00'
  }
];

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

