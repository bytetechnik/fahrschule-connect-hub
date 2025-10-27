import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  de: {
    // Auth
    'login': 'Anmelden',
    'logout': 'Abmelden',
    'email': 'E-Mail',
    'password': 'Passwort',
    'loginFailed': 'Anmeldung fehlgeschlagen',
    'demoCredentials': 'Demo-Anmeldedaten',
    'selectRole': 'Bitte wählen Sie Ihre Rolle',
    
    // Roles
    'admin': 'Administrator',
    'teacher': 'Fahrlehrer',
    'student': 'Schüler',
    
    // Navigation
    'dashboard': 'Dashboard',
    'lessons': 'Theoriestunden',
    'students': 'Schüler',
    'teachers': 'Fahrlehrer',
    'appointments': 'Termine',
    'payments': 'Zahlungen',
    'progress': 'Fortschritt',
    'discussion': 'Diskussion',
    'calendar': 'Kalender',
    'shop': 'Shop',
    'success': 'Erfolg',
    
    // Dashboard
    'welcome': 'Willkommen',
    'totalStudents': 'Gesamtanzahl Schüler',
    'totalTeachers': 'Gesamtanzahl Fahrlehrer',
    'activeAccounts': 'Aktive Konten',
    'totalLessons': 'Theoriestunden',
    'assignedStudents': 'Zugewiesene Schüler',
    'completedLessons': 'Abgeschlossene Stunden',
    'upcomingAppointments': 'Kommende Termine',
    'accountValidity': 'Kontogültigkeit',
    
    // Lessons
    'recordedLessons': 'Aufgezeichnete Theoriestunden',
    'watchLesson': 'Stunde ansehen',
    'markComplete': 'Als abgeschlossen markieren',
    'completed': 'Abgeschlossen',
    'notCompleted': 'Nicht abgeschlossen',
    
    // Appointments
    'bookAppointment': 'Termin buchen',
    'appointmentHistory': 'Terminverlauf',
    'date': 'Datum',
    'time': 'Uhrzeit',
    'status': 'Status',
    'approved': 'Genehmigt',
    'pending': 'Ausstehend',
    'cancelled': 'Storniert',
    'approve': 'Genehmigen',
    'cancel': 'Stornieren',
    
    // Payments
    'makePayment': 'Zahlung tätigen',
    'paymentHistory': 'Zahlungsverlauf',
    'amount': 'Betrag',
    'paymentStatus': 'Zahlungsstatus',
    'paid': 'Bezahlt',
    'exportReport': 'Bericht exportieren',
    
    // Common
    'save': 'Speichern',
    'cancelBtn': 'Abbrechen',
    'edit': 'Bearbeiten',
    'delete': 'Löschen',
    'view': 'Ansehen',
    'name': 'Name',
    'description': 'Beschreibung',
    'title': 'Titel',
    'message': 'Nachricht',
    'send': 'Senden',
    'back': 'Zurück',
    
    // Calendar
    'availability': 'Verfügbarkeit',
    'setAvailability': 'Verfügbarkeit festlegen',
    'teacherSchedule': 'Fahrlehrerplan',
    'selectDate': 'Datum auswählen',
    'selectTime': 'Zeit auswählen',
    'availableSlots': 'Verfügbare Slots',
    'book': 'Buchen',
    'available': 'Verfügbar',
    'booked': 'Gebucht',
    'addTimeSlot': 'Zeitslot hinzufügen',
    'removeSlot': 'Slot entfernen',
    'saveAvailability': 'Verfügbarkeit speichern',
  },
  en: {
    // Auth
    'login': 'Login',
    'logout': 'Logout',
    'email': 'Email',
    'password': 'Password',
    'loginFailed': 'Login failed',
    'demoCredentials': 'Demo Login Credentials',
    'selectRole': 'Please choose your role',
    
    // Roles
    'admin': 'Administrator',
    'teacher': 'Driving Teacher',
    'student': 'Student',
    
    // Navigation
    'dashboard': 'Dashboard',
    'lessons': 'Theory Lessons',
    'students': 'Students',
    'teachers': 'Teachers',
    'appointments': 'Appointments',
    'payments': 'Payments',
    'progress': 'Progress',
    'discussion': 'Discussion',
    'calendar': 'Calendar',
    'shop': 'Shop',
    'success': 'Success',
    
    // Dashboard
    'welcome': 'Welcome',
    'totalStudents': 'Total Students',
    'totalTeachers': 'Total Teachers',
    'activeAccounts': 'Active Accounts',
    'totalLessons': 'Theory Lessons',
    'assignedStudents': 'Assigned Students',
    'completedLessons': 'Completed Lessons',
    'upcomingAppointments': 'Upcoming Appointments',
    'accountValidity': 'Account Validity',
    
    // Lessons
    'recordedLessons': 'Recorded Theory Lessons',
    'watchLesson': 'Watch Lesson',
    'markComplete': 'Mark as Complete',
    'completed': 'Completed',
    'notCompleted': 'Not Completed',
    
    // Appointments
    'bookAppointment': 'Book Appointment',
    'appointmentHistory': 'Appointment History',
    'date': 'Date',
    'time': 'Time',
    'status': 'Status',
    'approved': 'Approved',
    'pending': 'Pending',
    'cancelled': 'Cancelled',
    'approve': 'Approve',
    'cancel': 'Cancel',
    
    // Payments
    'makePayment': 'Make Payment',
    'paymentHistory': 'Payment History',
    'amount': 'Amount',
    'paymentStatus': 'Payment Status',
    'paid': 'Paid',
    'exportReport': 'Export Report',
    
    // Common
    'save': 'Save',
    'cancelBtn': 'Cancel',
    'edit': 'Edit',
    'delete': 'Delete',
    'view': 'View',
    'name': 'Name',
    'description': 'Description',
    'title': 'Title',
    'message': 'Message',
    'send': 'Send',
    'back': 'Back',
    
    // Calendar
    'availability': 'Availability',
    'setAvailability': 'Set Availability',
    'teacherSchedule': 'Teacher Schedule',
    'selectDate': 'Select Date',
    'selectTime': 'Select Time',
    'availableSlots': 'Available Slots',
    'book': 'Book',
    'available': 'Available',
    'booked': 'Booked',
    'addTimeSlot': 'Add Time Slot',
    'removeSlot': 'Remove Slot',
    'saveAvailability': 'Save Availability',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('de');

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'de' || stored === 'en')) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
