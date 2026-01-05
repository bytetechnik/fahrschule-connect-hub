import type { StudentProcess } from '@/types';
import { mockStudents } from './students';

// Student process state (per student)
const initialStudentProcesses: StudentProcess[] = mockStudents.map((s) => ({
  studentId: s.id,
  currentStep: 'prerequisites',
  prerequisites: {
    firstAidCertificate: false,
    biometricPhotos: false,
    eyeTest: false,
  },
  updatedAt: new Date().toISOString(),
}));

export const getStudentProcesses = (): StudentProcess[] => {
  const stored = localStorage.getItem('studentProcesses');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('studentProcesses', JSON.stringify(initialStudentProcesses));
  return initialStudentProcesses;
};

export const saveStudentProcesses = (processes: StudentProcess[]) => {
  localStorage.setItem('studentProcesses', JSON.stringify(processes));
};

export const getStudentProcessByStudentId = (studentId: string): StudentProcess | undefined => {
  const processes = getStudentProcesses();
  return processes.find((p) => p.studentId === studentId);
};

export const updateStudentProcess = (
  studentId: string,
  updates: Partial<Omit<StudentProcess, 'studentId'>>
): StudentProcess => {
  const processes = getStudentProcesses();
  const index = processes.findIndex((p) => p.studentId === studentId);
  const base: StudentProcess =
    index >= 0
      ? processes[index]
      : {
          studentId,
          currentStep: 'prerequisites',
          prerequisites: {
            firstAidCertificate: false,
            biometricPhotos: false,
            eyeTest: false,
          },
          updatedAt: new Date().toISOString(),
        };

  const merged: StudentProcess = {
    ...base,
    ...updates,
    prerequisites: {
      ...base.prerequisites,
      ...(updates.prerequisites || {}),
    },
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    processes[index] = merged;
  } else {
    processes.push(merged);
  }
  saveStudentProcesses(processes);
  return merged;
};

