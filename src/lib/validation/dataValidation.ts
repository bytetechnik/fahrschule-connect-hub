import { getStudents } from '../mockData/students';
import { getTeachers } from '../mockData/teachers';
import { getAppointments } from '../mockData/appointments';
import { getPayments } from '../mockData/payments';
import { getProgress } from '../mockData/progress';
import { getStudentProcesses } from '../mockData/studentProcess';
import { getStudentTickets } from '../mockData/tickets';
import { getDiscussions } from '../mockData/discussions';
import { getAvailability } from '../mockData/availability';
import { getPracticalLessonRecords } from '../mockData/practicalLessons';
import { mockConversations, mockMessages } from '../mockData/messaging';
import type { Student, Teacher } from '@/types';

export interface ValidationError {
  type: 'student_id' | 'teacher_id' | 'date_logic' | 'orphaned_data';
  severity: 'error' | 'warning';
  message: string;
  entityType: string;
  entityId?: string;
  details?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Validates all data consistency across the application
 */
export const validateAllData = (): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  const students = getStudents();
  const teachers = getTeachers();
  const appointments = getAppointments();
  const payments = getPayments();
  const progress = getProgress();
  const studentProcesses = getStudentProcesses();
  const studentTickets = getStudentTickets();
  const discussions = getDiscussions();
  const availability = getAvailability();
  const practicalLessonRecords = getPracticalLessonRecords();
  
  // Get messaging data
  let conversations: any[] = [];
  let messages: any[] = [];
  try {
    const stored = localStorage.getItem('fahrschule_conversations');
    conversations = stored ? JSON.parse(stored) : mockConversations;
  } catch (e) {
    conversations = mockConversations;
  }
  try {
    const stored = localStorage.getItem('fahrschule_messages');
    messages = stored ? JSON.parse(stored) : mockMessages;
  } catch (e) {
    messages = mockMessages;
  }

  // Build lookup sets for quick validation
  const studentIds = new Set(students.map(s => s.id));
  const teacherIds = new Set(teachers.map(t => t.id));
  const studentMap = new Map(students.map(s => [s.id, s]));

  // 1. Validate Student IDs in all related data
  validateStudentIds(
    studentIds,
    appointments,
    payments,
    progress,
    studentProcesses,
    studentTickets,
    discussions,
    availability,
    practicalLessonRecords,
    conversations,
    messages,
    errors
  );

  // 2. Validate Teacher IDs
  validateTeacherIds(
    teacherIds,
    students,
    appointments,
    availability,
    practicalLessonRecords,
    discussions,
    conversations,
    messages,
    errors
  );

  // 3. Validate Date Logic
  validateDateLogic(
    studentMap,
    appointments,
    progress,
    practicalLessonRecords,
    errors,
    warnings
  );

  // 4. Check for orphaned data
  checkOrphanedData(
    studentIds,
    teacherIds,
    appointments,
    payments,
    progress,
    studentProcesses,
    studentTickets,
    availability,
    practicalLessonRecords,
    errors,
    warnings
  );

  const allErrors = errors.filter(e => e.severity === 'error');
  const allWarnings = [...errors.filter(e => e.severity === 'warning'), ...warnings];

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
};

/**
 * Validates that all student IDs referenced in related data exist
 */
function validateStudentIds(
  studentIds: Set<string>,
  appointments: any[],
  payments: any[],
  progress: any[],
  studentProcesses: any[],
  studentTickets: any[],
  discussions: any[],
  availability: any[],
  practicalLessonRecords: any[],
  conversations: any[],
  messages: any[],
  errors: ValidationError[]
) {
  // Check appointments
  appointments.forEach(apt => {
    if (!studentIds.has(apt.studentId)) {
      errors.push({
        type: 'student_id',
        severity: 'error',
        message: `Appointment references non-existent student: ${apt.studentId}`,
        entityType: 'appointment',
        entityId: apt.id,
      });
    }
  });

  // Check payments
  payments.forEach(payment => {
    if (!studentIds.has(payment.studentId)) {
      errors.push({
        type: 'student_id',
        severity: 'error',
        message: `Payment references non-existent student: ${payment.studentId}`,
        entityType: 'payment',
        entityId: payment.id,
      });
    }
  });

  // Check progress
  progress.forEach(prog => {
    if (!studentIds.has(prog.studentId)) {
      errors.push({
        type: 'student_id',
        severity: 'error',
        message: `Progress record references non-existent student: ${prog.studentId}`,
        entityType: 'progress',
        entityId: `${prog.studentId}-${prog.lessonId}`,
      });
    }
  });

  // Check student processes
  studentProcesses.forEach(proc => {
    if (!studentIds.has(proc.studentId)) {
      errors.push({
        type: 'student_id',
        severity: 'error',
        message: `Student process references non-existent student: ${proc.studentId}`,
        entityType: 'studentProcess',
        entityId: proc.studentId,
      });
    }
  });

  // Check student tickets
  studentTickets.forEach(ticket => {
    if (!studentIds.has(ticket.studentId)) {
      errors.push({
        type: 'student_id',
        severity: 'error',
        message: `Student ticket references non-existent student: ${ticket.studentId}`,
        entityType: 'studentTicket',
        entityId: ticket.studentId,
      });
    }
  });

  // Check discussions (userId can be student or teacher)
  discussions.forEach(disc => {
    if (disc.userId.startsWith('student-') && !studentIds.has(disc.userId)) {
      errors.push({
        type: 'student_id',
        severity: 'error',
        message: `Discussion references non-existent student: ${disc.userId}`,
        entityType: 'discussion',
        entityId: disc.id,
      });
    }
  });

  // Check availability (bookedBy can be student)
  availability.forEach(avail => {
    avail.timeSlots?.forEach((slot: any) => {
      if (slot.bookedBy && slot.bookedBy.startsWith('student-') && !studentIds.has(slot.bookedBy)) {
        errors.push({
          type: 'student_id',
          severity: 'error',
          message: `Availability slot references non-existent student: ${slot.bookedBy}`,
          entityType: 'availability',
          entityId: avail.id,
          details: `Time slot: ${slot.time}`,
        });
      }
    });
  });

  // Check practical lesson records
  practicalLessonRecords.forEach(record => {
    if (!studentIds.has(record.studentId)) {
      errors.push({
        type: 'student_id',
        severity: 'error',
        message: `Practical lesson record references non-existent student: ${record.studentId}`,
        entityType: 'practicalLessonRecord',
        entityId: record.id,
      });
    }
  });

  // Check conversations (participants can include students)
  conversations.forEach(conv => {
    conv.participants?.forEach((participantId: string) => {
      if (participantId.startsWith('student-') && !studentIds.has(participantId)) {
        errors.push({
          type: 'student_id',
          severity: 'error',
          message: `Conversation references non-existent student: ${participantId}`,
          entityType: 'conversation',
          entityId: conv.id,
        });
      }
    });
  });

  // Check messages (senderId can be student)
  messages.forEach(msg => {
    if (msg.senderId.startsWith('student-') && !studentIds.has(msg.senderId)) {
      errors.push({
        type: 'student_id',
        severity: 'error',
        message: `Message references non-existent student: ${msg.senderId}`,
        entityType: 'message',
        entityId: msg.id,
      });
    }
  });
}

/**
 * Validates that all teacher IDs are valid
 */
function validateTeacherIds(
  teacherIds: Set<string>,
  students: Student[],
  appointments: any[],
  availability: any[],
  practicalLessonRecords: any[],
  discussions: any[],
  conversations: any[],
  messages: any[],
  errors: ValidationError[]
) {
  // Check students
  students.forEach(student => {
    if (!teacherIds.has(student.teacherId)) {
      errors.push({
        type: 'teacher_id',
        severity: 'error',
        message: `Student ${student.name} (${student.id}) references non-existent teacher: ${student.teacherId}`,
        entityType: 'student',
        entityId: student.id,
      });
    }
  });

  // Check appointments
  appointments.forEach(apt => {
    if (!teacherIds.has(apt.teacherId)) {
      errors.push({
        type: 'teacher_id',
        severity: 'error',
        message: `Appointment references non-existent teacher: ${apt.teacherId}`,
        entityType: 'appointment',
        entityId: apt.id,
      });
    }
  });

  // Check availability
  availability.forEach(avail => {
    if (!teacherIds.has(avail.teacherId)) {
      errors.push({
        type: 'teacher_id',
        severity: 'error',
        message: `Availability references non-existent teacher: ${avail.teacherId}`,
        entityType: 'availability',
        entityId: avail.id,
      });
    }
  });

  // Check practical lesson records
  practicalLessonRecords.forEach(record => {
    if (!teacherIds.has(record.teacherId)) {
      errors.push({
        type: 'teacher_id',
        severity: 'error',
        message: `Practical lesson record references non-existent teacher: ${record.teacherId}`,
        entityType: 'practicalLessonRecord',
        entityId: record.id,
      });
    }
  });

  // Check discussions (userId can be teacher)
  discussions.forEach(disc => {
    if (disc.userId.startsWith('teacher-') && !teacherIds.has(disc.userId)) {
      errors.push({
        type: 'teacher_id',
        severity: 'error',
        message: `Discussion references non-existent teacher: ${disc.userId}`,
        entityType: 'discussion',
        entityId: disc.id,
      });
    }
  });

  // Check conversations (participants can include teachers)
  conversations.forEach(conv => {
    conv.participants?.forEach((participantId: string) => {
      if (participantId.startsWith('teacher-') && !teacherIds.has(participantId)) {
        errors.push({
          type: 'teacher_id',
          severity: 'error',
          message: `Conversation references non-existent teacher: ${participantId}`,
          entityType: 'conversation',
          entityId: conv.id,
        });
      }
    });
  });

  // Check messages (senderId can be teacher)
  messages.forEach(msg => {
    if (msg.senderId.startsWith('teacher-') && !teacherIds.has(msg.senderId)) {
      errors.push({
        type: 'teacher_id',
        severity: 'error',
        message: `Message references non-existent teacher: ${msg.senderId}`,
        entityType: 'message',
        entityId: msg.id,
      });
    }
  });
}

/**
 * Validates date logic across all entities
 */
function validateDateLogic(
  studentMap: Map<string, Student>,
  appointments: any[],
  progress: any[],
  practicalLessonRecords: any[],
  errors: ValidationError[],
  warnings: ValidationError[]
) {
  const now = new Date();

  // Validate appointments
  appointments.forEach(apt => {
    const student = studentMap.get(apt.studentId);
    if (!student) return; // Already caught by student ID validation

    const appointmentDate = new Date(apt.date);
    const joiningDate = new Date(student.joiningDate);
    const createdAt = apt.createdAt ? new Date(apt.createdAt) : null;

    // Appointment date should be after joining date
    if (appointmentDate < joiningDate) {
      errors.push({
        type: 'date_logic',
        severity: 'error',
        message: `Appointment date (${apt.date}) is before student joining date (${student.joiningDate})`,
        entityType: 'appointment',
        entityId: apt.id,
        details: `Student: ${student.name}`,
      });
    }

    // Appointment date should not be too far in the past (warning)
    const daysDiff = (now.getTime() - appointmentDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysDiff > 365 && apt.status === 'scheduled') {
      warnings.push({
        type: 'date_logic',
        severity: 'warning',
        message: `Appointment is scheduled more than a year in the past: ${apt.date}`,
        entityType: 'appointment',
        entityId: apt.id,
      });
    }

    // CreatedAt should be before or equal to appointment date (if both exist)
    if (createdAt && appointmentDate < createdAt) {
      warnings.push({
        type: 'date_logic',
        severity: 'warning',
        message: `Appointment created date (${apt.createdAt}) is after appointment date (${apt.date})`,
        entityType: 'appointment',
        entityId: apt.id,
      });
    }
  });

  // Validate progress
  progress.forEach(prog => {
    const student = studentMap.get(prog.studentId);
    if (!student) return;

    if (prog.completedDate) {
      const completedDate = new Date(prog.completedDate);
      const joiningDate = new Date(student.joiningDate);

      if (completedDate < joiningDate) {
        errors.push({
          type: 'date_logic',
          severity: 'error',
          message: `Progress completed date (${prog.completedDate}) is before student joining date (${student.joiningDate})`,
          entityType: 'progress',
          entityId: `${prog.studentId}-${prog.lessonId}`,
          details: `Student: ${student.name}`,
        });
      }
    }
  });

  // Validate practical lesson records
  practicalLessonRecords.forEach(record => {
    const student = studentMap.get(record.studentId);
    if (!student) return;

    const lessonDate = new Date(record.date);
    const joiningDate = new Date(student.joiningDate);
    const createdAt = record.createdAt ? new Date(record.createdAt) : null;

    // Lesson date should be after joining date
    if (lessonDate < joiningDate) {
      errors.push({
        type: 'date_logic',
        severity: 'error',
        message: `Practical lesson date (${record.date}) is before student joining date (${student.joiningDate})`,
        entityType: 'practicalLessonRecord',
        entityId: record.id,
        details: `Student: ${student.name}`,
      });
    }

    // CreatedAt should be before or equal to lesson date (if both exist)
    if (createdAt && lessonDate < createdAt) {
      warnings.push({
        type: 'date_logic',
        severity: 'warning',
        message: `Practical lesson created date (${record.createdAt}) is after lesson date (${record.date})`,
        entityType: 'practicalLessonRecord',
        entityId: record.id,
      });
    }
  });

  // Validate student validity dates
  studentMap.forEach((student, studentId) => {
    const validityDate = new Date(student.validityDate);
    const joiningDate = new Date(student.joiningDate);

    // Validity date should be after joining date
    if (validityDate < joiningDate) {
      errors.push({
        type: 'date_logic',
        severity: 'error',
        message: `Student validity date (${student.validityDate}) is before joining date (${student.joiningDate})`,
        entityType: 'student',
        entityId: studentId,
        details: `Student: ${student.name}`,
      });
    }
  });
}

/**
 * Checks for orphaned data (entities that reference non-existent IDs)
 */
function checkOrphanedData(
  studentIds: Set<string>,
  teacherIds: Set<string>,
  appointments: any[],
  payments: any[],
  progress: any[],
  studentProcesses: any[],
  studentTickets: any[],
  availability: any[],
  practicalLessonRecords: any[],
  errors: ValidationError[],
  warnings: ValidationError[]
) {
  // Check if there are student tickets for non-existent students
  studentTickets.forEach(ticket => {
    if (!studentIds.has(ticket.studentId)) {
      warnings.push({
        type: 'orphaned_data',
        severity: 'warning',
        message: `Orphaned student ticket found for non-existent student: ${ticket.studentId}`,
        entityType: 'studentTicket',
        entityId: ticket.studentId,
      });
    }
  });

  // Check if there are student processes for non-existent students
  studentProcesses.forEach(proc => {
    if (!studentIds.has(proc.studentId)) {
      warnings.push({
        type: 'orphaned_data',
        severity: 'warning',
        message: `Orphaned student process found for non-existent student: ${proc.studentId}`,
        entityType: 'studentProcess',
        entityId: proc.studentId,
      });
    }
  });
}

/**
 * Validates a single student's data consistency
 */
export const validateStudentData = (studentId: string): ValidationResult => {
  const students = getStudents();
  const student = students.find(s => s.id === studentId);
  
  if (!student) {
    return {
      isValid: false,
      errors: [{
        type: 'student_id',
        severity: 'error',
        message: `Student with ID ${studentId} not found`,
        entityType: 'student',
        entityId: studentId,
      }],
      warnings: [],
    };
  }

  // Get all related data for this student
  const appointments = getAppointments().filter(a => a.studentId === studentId);
  const payments = getPayments().filter(p => p.studentId === studentId);
  const progress = getProgress().filter(p => p.studentId === studentId);
  const studentProcesses = getStudentProcesses().filter(p => p.studentId === studentId);
  const studentTickets = getStudentTickets().filter(t => t.studentId === studentId);
  const practicalLessonRecords = getPracticalLessonRecords().filter(r => r.studentId === studentId);

  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Validate teacher ID
  const teachers = getTeachers();
  if (!teachers.find(t => t.id === student.teacherId)) {
    errors.push({
      type: 'teacher_id',
      severity: 'error',
      message: `Student references non-existent teacher: ${student.teacherId}`,
      entityType: 'student',
      entityId: studentId,
    });
  }

  // Validate dates
  const joiningDate = new Date(student.joiningDate);
  const validityDate = new Date(student.validityDate);

  if (validityDate < joiningDate) {
    errors.push({
      type: 'date_logic',
      severity: 'error',
      message: `Validity date is before joining date`,
      entityType: 'student',
      entityId: studentId,
    });
  }

  // Validate appointment dates
  appointments.forEach(apt => {
    const aptDate = new Date(apt.date);
    if (aptDate < joiningDate) {
      errors.push({
        type: 'date_logic',
        severity: 'error',
        message: `Appointment date (${apt.date}) is before joining date`,
        entityType: 'appointment',
        entityId: apt.id,
      });
    }
  });

  // Validate progress dates
  progress.forEach(prog => {
    if (prog.completedDate) {
      const completedDate = new Date(prog.completedDate);
      if (completedDate < joiningDate) {
        errors.push({
          type: 'date_logic',
          severity: 'error',
          message: `Progress completed date (${prog.completedDate}) is before joining date`,
          entityType: 'progress',
          entityId: `${prog.studentId}-${prog.lessonId}`,
        });
      }
    }
  });

  // Validate practical lesson dates
  practicalLessonRecords.forEach(record => {
    const lessonDate = new Date(record.date);
    if (lessonDate < joiningDate) {
      errors.push({
        type: 'date_logic',
        severity: 'error',
        message: `Practical lesson date (${record.date}) is before joining date`,
        entityType: 'practicalLessonRecord',
        entityId: record.id,
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validates a single teacher's data consistency
 */
export const validateTeacherData = (teacherId: string): ValidationResult => {
  const teachers = getTeachers();
  const teacher = teachers.find(t => t.id === teacherId);
  
  if (!teacher) {
    return {
      isValid: false,
      errors: [{
        type: 'teacher_id',
        severity: 'error',
        message: `Teacher with ID ${teacherId} not found`,
        entityType: 'teacher',
        entityId: teacherId,
      }],
      warnings: [],
    };
  }

  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Check students assigned to this teacher
  const students = getStudents().filter(s => s.teacherId === teacherId);
  
  // Check appointments
  const appointments = getAppointments().filter(a => a.teacherId === teacherId);
  
  // Check availability
  const availability = getAvailability().filter(a => a.teacherId === teacherId);
  
  // Check practical lesson records
  const practicalLessonRecords = getPracticalLessonRecords().filter(r => r.teacherId === teacherId);

  // All these should be valid (no specific validation needed beyond ID checks)
  // which are already done in validateAllData

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Formats validation results as a readable string
 */
export const formatValidationResults = (result: ValidationResult): string => {
  const lines: string[] = [];
  
  lines.push(`Validation ${result.isValid ? 'PASSED' : 'FAILED'}`);
  lines.push(`Errors: ${result.errors.length}`);
  lines.push(`Warnings: ${result.warnings.length}`);
  lines.push('');
  
  if (result.errors.length > 0) {
    lines.push('ERRORS:');
    result.errors.forEach((error, index) => {
      lines.push(`${index + 1}. [${error.type}] ${error.message}`);
      if (error.entityId) {
        lines.push(`   Entity: ${error.entityType} (${error.entityId})`);
      }
      if (error.details) {
        lines.push(`   Details: ${error.details}`);
      }
    });
    lines.push('');
  }
  
  if (result.warnings.length > 0) {
    lines.push('WARNINGS:');
    result.warnings.forEach((warning, index) => {
      lines.push(`${index + 1}. [${warning.type}] ${warning.message}`);
      if (warning.entityId) {
        lines.push(`   Entity: ${warning.entityType} (${warning.entityId})`);
      }
      if (warning.details) {
        lines.push(`   Details: ${warning.details}`);
      }
    });
  }
  
  return lines.join('\n');
};

/**
 * Logs validation results to the console
 */
export const logValidationResults = (result: ValidationResult): void => {
  console.group('Data Validation Results');
  console.log(`Status: ${result.isValid ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);
  
  if (result.errors.length > 0) {
    console.group('Errors');
    result.errors.forEach((error, index) => {
      console.error(`${index + 1}. [${error.type}] ${error.message}`, {
        entityType: error.entityType,
        entityId: error.entityId,
        details: error.details,
      });
    });
    console.groupEnd();
  }
  
  if (result.warnings.length > 0) {
    console.group('Warnings');
    result.warnings.forEach((warning, index) => {
      console.warn(`${index + 1}. [${warning.type}] ${warning.message}`, {
        entityType: warning.entityType,
        entityId: warning.entityId,
        details: warning.details,
      });
    });
    console.groupEnd();
  }
  
  console.groupEnd();
};

