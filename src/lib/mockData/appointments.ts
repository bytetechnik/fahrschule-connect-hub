import type { Appointment } from '@/types';
import { getDrivingLessonTicketsForStudent, consumeDrivingLessonTickets, addDrivingLessonTickets } from './tickets';

const initialAppointments: Appointment[] = [
  // Scheduled appointments
  { 
    id: 'apt-1', 
    teacherId: 'teacher-1', 
    studentId: 'student-1', 
    date: '2025-02-15', 
    time: '10:00', 
    duration: 90,
    ticketsUsed: 2,
    status: 'scheduled',
    createdAt: '2025-01-20T10:00:00Z'
  },
  { 
    id: 'apt-2', 
    teacherId: 'teacher-1', 
    studentId: 'student-2', 
    date: '2025-02-16', 
    time: '14:00',
    duration: 45,
    ticketsUsed: 1,
    status: 'scheduled',
    createdAt: '2025-01-21T10:00:00Z'
  },
  { 
    id: 'apt-3', 
    teacherId: 'teacher-2', 
    studentId: 'student-3', 
    date: '2025-02-17', 
    time: '11:00',
    duration: 135,
    ticketsUsed: 3,
    status: 'scheduled',
    createdAt: '2025-01-22T10:00:00Z'
  },
  { 
    id: 'apt-4', 
    teacherId: 'teacher-1', 
    studentId: 'student-5', 
    date: '2025-02-18', 
    time: '09:00',
    duration: 90,
    ticketsUsed: 2,
    status: 'scheduled',
    createdAt: '2025-01-25T09:00:00Z'
  },
  { 
    id: 'apt-5', 
    teacherId: 'teacher-2', 
    studentId: 'student-8', 
    date: '2025-02-19', 
    time: '15:00',
    duration: 45,
    ticketsUsed: 1,
    status: 'scheduled',
    createdAt: '2025-01-26T11:00:00Z'
  },
  { 
    id: 'apt-6', 
    teacherId: 'teacher-3', 
    studentId: 'student-9', 
    date: '2025-02-20', 
    time: '10:30',
    duration: 90,
    ticketsUsed: 2,
    status: 'scheduled',
    createdAt: '2025-01-27T14:00:00Z'
  },
  { 
    id: 'apt-7', 
    teacherId: 'teacher-1', 
    studentId: 'student-13', 
    date: '2025-02-21', 
    time: '13:00',
    duration: 45,
    ticketsUsed: 1,
    status: 'scheduled',
    createdAt: '2025-01-28T10:00:00Z'
  },
  { 
    id: 'apt-8', 
    teacherId: 'teacher-2', 
    studentId: 'student-11', 
    date: '2025-02-22', 
    time: '08:00',
    duration: 135,
    ticketsUsed: 3,
    status: 'scheduled',
    createdAt: '2025-01-29T09:00:00Z'
  },
  // Completed appointments
  { 
    id: 'apt-9', 
    teacherId: 'teacher-1', 
    studentId: 'student-1', 
    date: '2025-01-28', 
    time: '10:00',
    duration: 90,
    ticketsUsed: 2,
    status: 'completed',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-28T12:00:00Z'
  },
  { 
    id: 'apt-10', 
    teacherId: 'teacher-1', 
    studentId: 'student-2', 
    date: '2025-01-30', 
    time: '14:00',
    duration: 45,
    ticketsUsed: 1,
    status: 'completed',
    createdAt: '2025-01-18T10:00:00Z',
    updatedAt: '2025-01-30T15:00:00Z'
  },
  { 
    id: 'apt-11', 
    teacherId: 'teacher-2', 
    studentId: 'student-3', 
    date: '2025-02-01', 
    time: '11:00',
    duration: 90,
    ticketsUsed: 2,
    status: 'completed',
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-02-01T13:00:00Z'
  },
  { 
    id: 'apt-12', 
    teacherId: 'teacher-3', 
    studentId: 'student-5', 
    date: '2025-02-03', 
    time: '09:00',
    duration: 135,
    ticketsUsed: 3,
    status: 'completed',
    createdAt: '2025-01-22T09:00:00Z',
    updatedAt: '2025-02-03T11:30:00Z'
  },
  { 
    id: 'apt-13', 
    teacherId: 'teacher-1', 
    studentId: 'student-8', 
    date: '2025-02-05', 
    time: '15:00',
    duration: 45,
    ticketsUsed: 1,
    status: 'completed',
    createdAt: '2025-01-24T10:00:00Z',
    updatedAt: '2025-02-05T16:00:00Z'
  },
  { 
    id: 'apt-14', 
    teacherId: 'teacher-2', 
    studentId: 'student-11', 
    date: '2025-02-07', 
    time: '08:00',
    duration: 90,
    ticketsUsed: 2,
    status: 'completed',
    createdAt: '2025-01-26T08:00:00Z',
    updatedAt: '2025-02-07T10:00:00Z'
  },
  { 
    id: 'apt-15', 
    teacherId: 'teacher-3', 
    studentId: 'student-9', 
    date: '2025-02-10', 
    time: '10:30',
    duration: 45,
    ticketsUsed: 1,
    status: 'completed',
    createdAt: '2025-01-28T14:00:00Z',
    updatedAt: '2025-02-10T11:30:00Z'
  },
  { 
    id: 'apt-16', 
    teacherId: 'teacher-1', 
    studentId: 'student-13', 
    date: '2025-02-12', 
    time: '13:00',
    duration: 90,
    ticketsUsed: 2,
    status: 'completed',
    createdAt: '2025-01-30T10:00:00Z',
    updatedAt: '2025-02-12T14:30:00Z'
  },
  // Cancelled appointments
  { 
    id: 'apt-17', 
    teacherId: 'teacher-1', 
    studentId: 'student-2', 
    date: '2025-01-25', 
    time: '14:00',
    duration: 45,
    ticketsUsed: 1,
    status: 'cancelled',
    cancelledBy: 'student',
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-01-24T16:00:00Z'
  },
  { 
    id: 'apt-18', 
    teacherId: 'teacher-2', 
    studentId: 'student-3', 
    date: '2025-01-27', 
    time: '11:00',
    duration: 90,
    ticketsUsed: 2,
    status: 'cancelled',
    cancelledBy: 'teacher',
    cancelReason: 'Krankheit des Fahrlehrers',
    createdAt: '2025-01-22T10:00:00Z',
    updatedAt: '2025-01-26T08:00:00Z'
  },
  { 
    id: 'apt-19', 
    teacherId: 'teacher-3', 
    studentId: 'student-6', 
    date: '2025-02-08', 
    time: '09:00',
    duration: 90,
    ticketsUsed: 2,
    status: 'cancelled',
    cancelledBy: 'student',
    createdAt: '2025-01-25T09:00:00Z',
    updatedAt: '2025-02-07T18:00:00Z'
  },
  { 
    id: 'apt-20', 
    teacherId: 'teacher-1', 
    studentId: 'student-10', 
    date: '2025-02-11', 
    time: '10:00',
    duration: 45,
    ticketsUsed: 1,
    status: 'cancelled',
    cancelledBy: 'teacher',
    cancelReason: 'Wetterbedingte Absage - starker Schneefall',
    createdAt: '2025-01-28T10:00:00Z',
    updatedAt: '2025-02-10T07:00:00Z'
  },
  { 
    id: 'apt-21', 
    teacherId: 'teacher-2', 
    studentId: 'student-14', 
    date: '2025-02-13', 
    time: '15:00',
    duration: 90,
    ticketsUsed: 2,
    status: 'cancelled',
    cancelledBy: 'student',
    createdAt: '2025-01-30T11:00:00Z',
    updatedAt: '2025-02-12T14:00:00Z'
  },
];

export const getAppointments = (): Appointment[] => {
  const stored = localStorage.getItem('appointments');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('appointments', JSON.stringify(initialAppointments));
  return initialAppointments;
};

export const saveAppointments = (appointments: Appointment[]) => {
  localStorage.setItem('appointments', JSON.stringify(appointments));
};

// Create a new appointment (only by teacher) - deducts tickets
export const createAppointment = (
  teacherId: string,
  studentId: string,
  date: string,
  time: string,
  duration: number // in minutes
): { success: boolean; appointment?: Appointment; error?: string } => {
  // Calculate tickets needed (1 ticket = 45 minutes)
  const ticketsNeeded = Math.ceil(duration / 45);
  
  // Check if student has enough tickets
  const currentTickets = getDrivingLessonTicketsForStudent(studentId);
  if (currentTickets < ticketsNeeded) {
    return {
      success: false,
      error: `Student has only ${currentTickets} ticket(s), but ${ticketsNeeded} ticket(s) are needed for ${duration} minutes`
    };
  }
  
  // Deduct tickets
  const consumeResult = consumeDrivingLessonTickets(studentId, ticketsNeeded);
  if (!consumeResult.ok) {
    return {
      success: false,
      error: 'Failed to deduct tickets. Not enough tickets available.'
    };
  }
  
  // Create appointment
  const appointments = getAppointments();
  const newAppointment: Appointment = {
    id: `apt-${Date.now()}`,
    teacherId,
    studentId,
    date,
    time,
    duration,
    ticketsUsed: ticketsNeeded,
    status: 'scheduled',
    createdAt: new Date().toISOString()
  };
  
  appointments.push(newAppointment);
  saveAppointments(appointments);
  
  return { success: true, appointment: newAppointment };
};

// Cancel appointment - reverts tickets back to student
export const cancelAppointment = (
  appointmentId: string,
  cancelledBy: 'student' | 'teacher',
  cancelReason?: string
): { success: boolean; error?: string } => {
  const appointments = getAppointments();
  const appointment = appointments.find(a => a.id === appointmentId);
  
  if (!appointment) {
    return { success: false, error: 'Appointment not found' };
  }
  
  if (appointment.status === 'cancelled') {
    return { success: false, error: 'Appointment is already cancelled' };
  }
  
  // If cancelled by teacher, reason is required
  if (cancelledBy === 'teacher' && !cancelReason) {
    return { success: false, error: 'Cancellation reason is required when cancelling as teacher' };
  }
  
  // Revert tickets if status was scheduled
  if (appointment.status === 'scheduled') {
    addDrivingLessonTickets(appointment.studentId, appointment.ticketsUsed);
  }
  
  // Update appointment
  appointment.status = 'cancelled';
  appointment.cancelledBy = cancelledBy;
  appointment.cancelReason = cancelReason;
  appointment.updatedAt = new Date().toISOString();
  
  saveAppointments(appointments);
  return { success: true };
};

// Update appointment (only teacher can update)
export const updateAppointment = (
  appointmentId: string,
  updates: { date?: string; time?: string; duration?: number }
): { success: boolean; error?: string } => {
  const appointments = getAppointments();
  const appointment = appointments.find(a => a.id === appointmentId);
  
  if (!appointment) {
    return { success: false, error: 'Appointment not found' };
  }
  
  if (appointment.status !== 'scheduled') {
    return { success: false, error: 'Can only update scheduled appointments' };
  }
  
  // If duration changed, handle ticket adjustment
  if (updates.duration !== undefined && updates.duration !== appointment.duration) {
    const newTicketsNeeded = Math.ceil(updates.duration / 45);
    const ticketDifference = newTicketsNeeded - appointment.ticketsUsed;
    
    if (ticketDifference > 0) {
      // Need more tickets
      const currentTickets = getDrivingLessonTicketsForStudent(appointment.studentId);
      if (currentTickets < ticketDifference) {
        return {
          success: false,
          error: `Student has only ${currentTickets} ticket(s), but ${ticketDifference} more ticket(s) are needed`
        };
      }
      consumeDrivingLessonTickets(appointment.studentId, ticketDifference);
    } else if (ticketDifference < 0) {
      // Revert excess tickets
      addDrivingLessonTickets(appointment.studentId, Math.abs(ticketDifference));
    }
    
    appointment.duration = updates.duration;
    appointment.ticketsUsed = newTicketsNeeded;
  }
  
  if (updates.date) appointment.date = updates.date;
  if (updates.time) appointment.time = updates.time;
  appointment.updatedAt = new Date().toISOString();
  
  saveAppointments(appointments);
  return { success: true };
};

// Delete appointment (only teacher can delete)
export const deleteAppointment = (appointmentId: string): { success: boolean; error?: string } => {
  const appointments = getAppointments();
  const appointment = appointments.find(a => a.id === appointmentId);
  
  if (!appointment) {
    return { success: false, error: 'Appointment not found' };
  }
  
  // If scheduled, revert tickets
  if (appointment.status === 'scheduled') {
    addDrivingLessonTickets(appointment.studentId, appointment.ticketsUsed);
  }
  
  // Remove appointment
  const filtered = appointments.filter(a => a.id !== appointmentId);
  saveAppointments(filtered);
  
  return { success: true };
};

// Complete/Approve appointment (only teacher can approve, cannot be undone by teacher)
export const completeAppointment = (appointmentId: string): { success: boolean; error?: string } => {
  const appointments = getAppointments();
  const appointment = appointments.find(a => a.id === appointmentId);
  
  if (!appointment) {
    return { success: false, error: 'Appointment not found' };
  }
  
  if (appointment.status !== 'scheduled') {
    return { success: false, error: 'Can only complete scheduled appointments' };
  }
  
  // Mark as completed
  appointment.status = 'completed';
  appointment.updatedAt = new Date().toISOString();
  
  saveAppointments(appointments);
  return { success: true };
};

