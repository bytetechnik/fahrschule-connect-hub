import type { Payment } from '@/types';

const initialPayments: Payment[] = [
  // Student 1 payments
  { id: 'pay-1', studentId: 'student-1', amount: 450, date: '2022-08-20', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-2', studentId: 'student-1', amount: 350, date: '2022-09-15', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-3', studentId: 'student-1', amount: 350, date: '2022-11-10', status: 'paid', description: 'Fahrstundenpaket 2 (5 Fahrstunden)' },
  { id: 'pay-4', studentId: 'student-1', amount: 40, date: '2023-01-05', status: 'paid', description: 'Theorieprüfung' },
  { id: 'pay-5', studentId: 'student-1', amount: 170, date: '2023-02-20', status: 'paid', description: 'Praktische Prüfung' },
  { id: 'pay-6', studentId: 'student-1', amount: 280, date: '2024-03-12', status: 'paid', description: 'Fahrstundenpaket 3 (4 Fahrstunden)' },
  
  // Student 2 payments
  { id: 'pay-7', studentId: 'student-2', amount: 450, date: '2023-11-25', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-8', studentId: 'student-2', amount: 350, date: '2024-01-10', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-9', studentId: 'student-2', amount: 350, date: '2024-03-05', status: 'paid', description: 'Fahrstundenpaket 2 (5 Fahrstunden)' },
  { id: 'pay-10', studentId: 'student-2', amount: 280, date: '2024-05-18', status: 'paid', description: 'Fahrstundenpaket 3 (4 Fahrstunden)' },
  { id: 'pay-11', studentId: 'student-2', amount: 40, date: '2024-07-22', status: 'pending', description: 'Theorieprüfung' },
  
  // Student 3 payments
  { id: 'pay-12', studentId: 'student-3', amount: 450, date: '2023-05-15', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-13', studentId: 'student-3', amount: 350, date: '2023-07-20', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-14', studentId: 'student-3', amount: 350, date: '2023-09-10', status: 'paid', description: 'Fahrstundenpaket 2 (5 Fahrstunden)' },
  { id: 'pay-15', studentId: 'student-3', amount: 280, date: '2023-11-05', status: 'paid', description: 'Fahrstundenpaket 3 (4 Fahrstunden)' },
  { id: 'pay-16', studentId: 'student-3', amount: 40, date: '2024-01-15', status: 'paid', description: 'Theorieprüfung' },
  { id: 'pay-17', studentId: 'student-3', amount: 140, date: '2024-02-28', status: 'paid', description: 'Fahrstundenpaket 4 (2 Fahrstunden)' },
  
  // Student 4 payments
  { id: 'pay-18', studentId: 'student-4', amount: 450, date: '2024-01-10', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-19', studentId: 'student-4', amount: 350, date: '2024-02-20', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-20', studentId: 'student-4', amount: 280, date: '2024-04-15', status: 'paid', description: 'Fahrstundenpaket 2 (4 Fahrstunden)' },
  
  // Student 5 payments
  { id: 'pay-21', studentId: 'student-5', amount: 450, date: '2023-09-18', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-22', studentId: 'student-5', amount: 350, date: '2023-10-25', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-23', studentId: 'student-5', amount: 350, date: '2023-12-10', status: 'paid', description: 'Fahrstundenpaket 2 (5 Fahrstunden)' },
  { id: 'pay-24', studentId: 'student-5', amount: 350, date: '2024-02-05', status: 'paid', description: 'Fahrstundenpaket 3 (5 Fahrstunden)' },
  { id: 'pay-25', studentId: 'student-5', amount: 40, date: '2024-03-20', status: 'paid', description: 'Theorieprüfung' },
  { id: 'pay-26', studentId: 'student-5', amount: 170, date: '2024-05-10', status: 'paid', description: 'Praktische Prüfung' },
  
  // Student 6 payments
  { id: 'pay-27', studentId: 'student-6', amount: 450, date: '2024-07-25', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-28', studentId: 'student-6', amount: 350, date: '2024-09-10', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-29', studentId: 'student-6', amount: 280, date: '2024-11-05', status: 'pending', description: 'Fahrstundenpaket 2 (4 Fahrstunden)' },
  
  // Student 7 payments
  { id: 'pay-30', studentId: 'student-7', amount: 450, date: '2024-11-28', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-31', studentId: 'student-7', amount: 350, date: '2024-12-15', status: 'pending', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  
  // Student 8 payments
  { id: 'pay-32', studentId: 'student-8', amount: 450, date: '2023-12-15', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-33', studentId: 'student-8', amount: 350, date: '2024-01-20', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-34', studentId: 'student-8', amount: 350, date: '2024-03-10', status: 'paid', description: 'Fahrstundenpaket 2 (5 Fahrstunden)' },
  { id: 'pay-35', studentId: 'student-8', amount: 280, date: '2024-05-22', status: 'paid', description: 'Fahrstundenpaket 3 (4 Fahrstunden)' },
  
  // Student 9 payments
  { id: 'pay-36', studentId: 'student-9', amount: 450, date: '2024-04-10', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-37', studentId: 'student-9', amount: 350, date: '2024-05-25', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-38', studentId: 'student-9', amount: 280, date: '2024-07-18', status: 'paid', description: 'Fahrstundenpaket 2 (4 Fahrstunden)' },
  
  // Student 10 payments
  { id: 'pay-39', studentId: 'student-10', amount: 450, date: '2024-12-20', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-40', studentId: 'student-10', amount: 350, date: '2025-01-15', status: 'pending', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  
  // Student 11 payments
  { id: 'pay-41', studentId: 'student-11', amount: 450, date: '2023-07-30', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-42', studentId: 'student-11', amount: 350, date: '2023-09-15', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-43', studentId: 'student-11', amount: 350, date: '2023-11-05', status: 'paid', description: 'Fahrstundenpaket 2 (5 Fahrstunden)' },
  { id: 'pay-44', studentId: 'student-11', amount: 350, date: '2024-01-20', status: 'paid', description: 'Fahrstundenpaket 3 (5 Fahrstunden)' },
  { id: 'pay-45', studentId: 'student-11', amount: 40, date: '2024-03-10', status: 'paid', description: 'Theorieprüfung' },
  { id: 'pay-46', studentId: 'student-11', amount: 140, date: '2024-04-25', status: 'paid', description: 'Fahrstundenpaket 4 (2 Fahrstunden)' },
  
  // Student 12 payments
  { id: 'pay-47', studentId: 'student-12', amount: 450, date: '2024-11-05', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-48', studentId: 'student-12', amount: 350, date: '2024-11-28', status: 'pending', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  
  // Student 13 payments
  { id: 'pay-49', studentId: 'student-13', amount: 450, date: '2024-02-20', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-50', studentId: 'student-13', amount: 350, date: '2024-04-05', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-51', studentId: 'student-13', amount: 350, date: '2024-06-15', status: 'paid', description: 'Fahrstundenpaket 2 (5 Fahrstunden)' },
  { id: 'pay-52', studentId: 'student-13', amount: 280, date: '2024-08-20', status: 'paid', description: 'Fahrstundenpaket 3 (4 Fahrstunden)' },
  
  // Student 14 payments
  { id: 'pay-53', studentId: 'student-14', amount: 450, date: '2023-10-10', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-54', studentId: 'student-14', amount: 350, date: '2023-11-25', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-55', studentId: 'student-14', amount: 350, date: '2024-01-15', status: 'paid', description: 'Fahrstundenpaket 2 (5 Fahrstunden)' },
  { id: 'pay-56', studentId: 'student-14', amount: 280, date: '2024-03-10', status: 'paid', description: 'Fahrstundenpaket 3 (4 Fahrstunden)' },
  { id: 'pay-57', studentId: 'student-14', amount: 40, date: '2024-05-05', status: 'paid', description: 'Theorieprüfung' },
  
  // Student 15 payments
  { id: 'pay-58', studentId: 'student-15', amount: 450, date: '2024-08-25', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-59', studentId: 'student-15', amount: 350, date: '2024-09-30', status: 'paid', description: 'Fahrstundenpaket 1 (5 Fahrstunden)' },
  { id: 'pay-60', studentId: 'student-15', amount: 280, date: '2024-11-20', status: 'pending', description: 'Fahrstundenpaket 2 (4 Fahrstunden)' },
];

export const getPayments = (): Payment[] => {
  const stored = localStorage.getItem('payments');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('payments', JSON.stringify(initialPayments));
  return initialPayments;
};

export const savePayments = (payments: Payment[]) => {
  localStorage.setItem('payments', JSON.stringify(payments));
};

