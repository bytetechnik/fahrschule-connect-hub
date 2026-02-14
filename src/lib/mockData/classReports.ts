import { getProgress } from './progress';
import { getAppointments } from './appointments';
import { getStudents } from './students';
import { getTeachers } from './teachers';

export type MonthKey = string; // 'YYYY-MM'

export interface StudentClassReport {
  studentId: string;
  studentName: string;
  byMonth: Record<MonthKey, { theory: number; practical: number }>;
  months: MonthKey[];
  totalTheory: number;
  totalPractical: number;
  totalClasses: number;
}

export interface TeacherClassReport {
  teacherId: string;
  teacherName: string;
  byMonth: Record<MonthKey, number>;
  months: MonthKey[];
  totalClasses: number;
}

function getMonthKey(dateStr: string): MonthKey {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function getAllMonthsSorted(monthSet: Set<MonthKey>): MonthKey[] {
  return Array.from(monthSet).sort();
}

/**
 * Student classes completed:
 * - Theory: from Progress (completed lessons with completedDate)
 * - Practical: from completed Appointments (driving lessons)
 */
export function getStudentClassReports(): StudentClassReport[] {
  const progress = getProgress();
  const appointments = getAppointments();
  const students = getStudents();

  const monthSet = new Set<MonthKey>();

  const byStudent: Record<
    string,
    { byMonth: Record<MonthKey, { theory: number; practical: number }> }
  > = {};

  for (const p of progress) {
    if (!p.completed || !p.completedDate) continue;
    const month = getMonthKey(p.completedDate);
    monthSet.add(month);
    if (!byStudent[p.studentId]) {
      byStudent[p.studentId] = { byMonth: {} };
    }
    if (!byStudent[p.studentId].byMonth[month]) {
      byStudent[p.studentId].byMonth[month] = { theory: 0, practical: 0 };
    }
    byStudent[p.studentId].byMonth[month].theory += 1;
  }

  for (const apt of appointments) {
    if (apt.status !== 'completed') continue;
    const month = getMonthKey(apt.date);
    monthSet.add(month);
    if (!byStudent[apt.studentId]) {
      byStudent[apt.studentId] = { byMonth: {} };
    }
    if (!byStudent[apt.studentId].byMonth[month]) {
      byStudent[apt.studentId].byMonth[month] = { theory: 0, practical: 0 };
    }
    byStudent[apt.studentId].byMonth[month].practical += 1;
  }

  const months = getAllMonthsSorted(monthSet);

  return students.map((s) => {
    const data = byStudent[s.id]?.byMonth ?? {};
    let totalTheory = 0;
    let totalPractical = 0;
    const byMonth: Record<MonthKey, { theory: number; practical: number }> = {};
    for (const m of months) {
      const cell = data[m] ?? { theory: 0, practical: 0 };
      byMonth[m] = { ...cell };
      totalTheory += cell.theory;
      totalPractical += cell.practical;
    }
    return {
      studentId: s.id,
      studentName: s.name,
      byMonth,
      months,
      totalTheory,
      totalPractical,
      totalClasses: totalTheory + totalPractical,
    };
  });
}

/**
 * Teacher classes conducted per month: completed Appointments (driving lessons taught)
 */
export function getTeacherClassReports(): TeacherClassReport[] {
  const appointments = getAppointments();
  const teachers = getTeachers();

  const monthSet = new Set<MonthKey>();
  const byTeacher: Record<string, Record<MonthKey, number>> = {};

  for (const apt of appointments) {
    if (apt.status !== 'completed') continue;
    const month = getMonthKey(apt.date);
    monthSet.add(month);
    if (!byTeacher[apt.teacherId]) byTeacher[apt.teacherId] = {};
    byTeacher[apt.teacherId][month] = (byTeacher[apt.teacherId][month] ?? 0) + 1;
  }

  const months = getAllMonthsSorted(monthSet);

  return teachers.map((t) => {
    const data = byTeacher[t.id] ?? {};
    let totalClasses = 0;
    const byMonth: Record<MonthKey, number> = {};
    for (const m of months) {
      const count = data[m] ?? 0;
      byMonth[m] = count;
      totalClasses += count;
    }
    return {
      teacherId: t.id,
      teacherName: t.name,
      byMonth,
      months,
      totalClasses,
    };
  });
}
