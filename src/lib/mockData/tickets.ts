import type { StudentTickets } from '@/types';
import { mockStudents } from './students';

const initialStudentTickets: StudentTickets[] = mockStudents.map((s) => ({
  studentId: s.id,
  drivingLessonTickets: 0,
}));

export const getStudentTickets = (): StudentTickets[] => {
  const stored = localStorage.getItem('studentTickets');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('studentTickets', JSON.stringify(initialStudentTickets));
  return initialStudentTickets;
};

export const saveStudentTickets = (tickets: StudentTickets[]) => {
  localStorage.setItem('studentTickets', JSON.stringify(tickets));
};

export const getDrivingLessonTicketsForStudent = (studentId: string): number => {
  const tickets = getStudentTickets();
  const entry = tickets.find((t) => t.studentId === studentId);
  return entry ? entry.drivingLessonTickets : 0;
};

export const addDrivingLessonTickets = (studentId: string, count: number): number => {
  if (count <= 0) return getDrivingLessonTicketsForStudent(studentId);
  const tickets = getStudentTickets();
  const index = tickets.findIndex((t) => t.studentId === studentId);
  if (index >= 0) {
    tickets[index] = {
      ...tickets[index],
      drivingLessonTickets: tickets[index].drivingLessonTickets + count,
    };
  } else {
    tickets.push({ studentId, drivingLessonTickets: count });
  }
  saveStudentTickets(tickets);
  return tickets.find((t) => t.studentId === studentId)!.drivingLessonTickets;
};

export const consumeDrivingLessonTickets = (studentId: string, count: number): { ok: boolean; remaining: number } => {
  if (count <= 0) return { ok: true, remaining: getDrivingLessonTicketsForStudent(studentId) };
  const tickets = getStudentTickets();
  const index = tickets.findIndex((t) => t.studentId === studentId);
  if (index === -1 || tickets[index].drivingLessonTickets < count) {
    return { ok: false, remaining: index >= 0 ? tickets[index].drivingLessonTickets : 0 };
  }
  tickets[index] = {
    ...tickets[index],
    drivingLessonTickets: tickets[index].drivingLessonTickets - count,
  };
  saveStudentTickets(tickets);
  return { ok: true, remaining: tickets[index].drivingLessonTickets };
};

