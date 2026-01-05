import type { TeacherAvailability } from '@/types';

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

export const clearAvailability = () => {
  localStorage.setItem('availability', JSON.stringify([]));
};

