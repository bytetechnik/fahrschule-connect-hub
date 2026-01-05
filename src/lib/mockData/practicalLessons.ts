import type { PracticalLessonTopic, PracticalLessonRecord } from '@/types';

export const mockPracticalLessonTopics: PracticalLessonTopic[] = [
  // Grundfahrübungen (Basic Driving Exercises)
  {
    id: 'topic-1',
    name: 'Anfahren und Anhalten',
    nameEn: 'Starting and Stopping',
    description: 'Anfahren vom Fahrbahnrand, Anhalten am Fahrbahnrand',
    descriptionEn: 'Starting from the side of the road, stopping at the side of the road',
    category: 'grundfahraufgabe'
  },
  {
    id: 'topic-2',
    name: 'Umkehren',
    nameEn: 'Turning Around',
    description: 'Umkehren durch Einfädeln in eine Seitenstraße',
    descriptionEn: 'Turning around by pulling into a side street',
    category: 'grundfahraufgabe'
  },
  {
    id: 'topic-3',
    name: 'Rückwärtsfahren und Einparken',
    nameEn: 'Reversing and Parking',
    description: 'Rückwärtsfahren, Längs- und Querparken',
    descriptionEn: 'Reversing, parallel and perpendicular parking',
    category: 'parken'
  },
  {
    id: 'topic-4',
    name: 'Fahrzeugbeherrschung',
    nameEn: 'Vehicle Control',
    description: 'Grundlegende Fahrzeugbeherrschung, Lenkung, Kupplung, Bremsen',
    descriptionEn: 'Basic vehicle control, steering, clutch, braking',
    category: 'grundfahraufgabe'
  },
  // Stadtfahrt (City Driving)
  {
    id: 'topic-5',
    name: 'Stadtfahrt - Grundlagen',
    nameEn: 'City Driving - Basics',
    description: 'Fahren in verkehrsberuhigten Zonen, Kreuzungen, Ampeln',
    descriptionEn: 'Driving in traffic-calmed zones, intersections, traffic lights',
    category: 'stadtfahrt'
  },
  {
    id: 'topic-6',
    name: 'Stadtfahrt - Verkehrsbeobachtung',
    nameEn: 'City Driving - Traffic Observation',
    description: 'Spiegel, Schulterblick, Verkehrsbeobachtung',
    descriptionEn: 'Mirrors, shoulder check, traffic observation',
    category: 'stadtfahrt'
  },
  {
    id: 'topic-7',
    name: 'Stadtfahrt - Vorfahrt und Vorfahrtsregeln',
    nameEn: 'City Driving - Right of Way',
    description: 'Rechts vor links, Vorfahrt beachten, Kreisverkehr',
    descriptionEn: 'Right before left, right of way, roundabouts',
    category: 'stadtfahrt'
  },
  // Sonderfahrten (Special Driving Lessons)
  {
    id: 'topic-8',
    name: 'Überlandfahrt - Grundlagen',
    nameEn: 'Country Road Driving - Basics',
    description: 'Fahren auf Landstraßen, Kurven, Steigungen',
    descriptionEn: 'Driving on country roads, curves, inclines',
    category: 'ueberland'
  },
  {
    id: 'topic-9',
    name: 'Überlandfahrt - Überholen',
    nameEn: 'Country Road Driving - Overtaking',
    description: 'Sicheres Überholen auf Landstraßen',
    descriptionEn: 'Safe overtaking on country roads',
    category: 'ueberland'
  },
  {
    id: 'topic-10',
    name: 'Autobahnfahrt - Einfädeln',
    nameEn: 'Highway Driving - Merging',
    description: 'Auffahren auf die Autobahn, Einfädeln',
    descriptionEn: 'Entering the highway, merging',
    category: 'autobahn'
  },
  {
    id: 'topic-11',
    name: 'Autobahnfahrt - Spurwechsel',
    nameEn: 'Highway Driving - Lane Changes',
    description: 'Spurwechsel, Überholen auf der Autobahn',
    descriptionEn: 'Lane changes, overtaking on the highway',
    category: 'autobahn'
  },
  {
    id: 'topic-12',
    name: 'Autobahnfahrt - Abfahrt',
    nameEn: 'Highway Driving - Exiting',
    description: 'Abfahren von der Autobahn, Ausfahrt nehmen',
    descriptionEn: 'Exiting the highway, taking the exit',
    category: 'autobahn'
  },
  {
    id: 'topic-13',
    name: 'Beleuchtungsfahrt - Nachtfahrt',
    nameEn: 'Night Driving',
    description: 'Fahren bei Dunkelheit, Beleuchtung richtig nutzen',
    descriptionEn: 'Driving in darkness, using lighting correctly',
    category: 'beleuchtung'
  },
  {
    id: 'topic-14',
    name: 'Beleuchtungsfahrt - Nebel und Regen',
    nameEn: 'Night Driving - Fog and Rain',
    description: 'Fahren bei schlechter Sicht, Nebelscheinwerfer',
    descriptionEn: 'Driving in poor visibility, fog lights',
    category: 'beleuchtung'
  },
  // Parken (Parking)
  {
    id: 'topic-15',
    name: 'Längsparken',
    nameEn: 'Parallel Parking',
    description: 'Einparken längs zur Fahrbahn',
    descriptionEn: 'Parking parallel to the road',
    category: 'parken'
  },
  {
    id: 'topic-16',
    name: 'Querparken',
    nameEn: 'Perpendicular Parking',
    description: 'Einparken quer zur Fahrbahn',
    descriptionEn: 'Parking perpendicular to the road',
    category: 'parken'
  },
  {
    id: 'topic-17',
    name: 'Schrägparken',
    nameEn: 'Angle Parking',
    description: 'Einparken schräg zur Fahrbahn',
    descriptionEn: 'Parking at an angle to the road',
    category: 'parken'
  },
  // Other
  {
    id: 'topic-18',
    name: 'Wenden in drei Zügen',
    nameEn: 'Three-Point Turn',
    description: 'Wenden des Fahrzeugs in drei Zügen',
    descriptionEn: 'Turning the vehicle around in three moves',
    category: 'grundfahraufgabe'
  },
  {
    id: 'topic-19',
    name: 'Fahren bei verschiedenen Wetterbedingungen',
    nameEn: 'Driving in Various Weather Conditions',
    description: 'Fahren bei Regen, Schnee, Eis',
    descriptionEn: 'Driving in rain, snow, ice',
    category: 'other'
  },
  {
    id: 'topic-20',
    name: 'Defensives Fahren',
    nameEn: 'Defensive Driving',
    description: 'Vorausschauendes Fahren, Gefahren erkennen',
    descriptionEn: 'Anticipatory driving, recognizing hazards',
    category: 'other'
  }
];

export const getPracticalLessonTopics = (): PracticalLessonTopic[] => {
  const stored = localStorage.getItem('practicalLessonTopics');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('practicalLessonTopics', JSON.stringify(mockPracticalLessonTopics));
  return mockPracticalLessonTopics;
};

export const savePracticalLessonTopics = (topics: PracticalLessonTopic[]) => {
  localStorage.setItem('practicalLessonTopics', JSON.stringify(topics));
};

export const createPracticalLessonTopic = (topic: Omit<PracticalLessonTopic, 'id'>): PracticalLessonTopic => {
  const topics = getPracticalLessonTopics();
  const newTopic: PracticalLessonTopic = {
    ...topic,
    id: `topic-${Date.now()}`,
  };
  topics.push(newTopic);
  savePracticalLessonTopics(topics);
  return newTopic;
};

export const updatePracticalLessonTopic = (id: string, updates: Partial<PracticalLessonTopic>): PracticalLessonTopic | null => {
  const topics = getPracticalLessonTopics();
  const index = topics.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  topics[index] = { ...topics[index], ...updates };
  savePracticalLessonTopics(topics);
  return topics[index];
};

export const deletePracticalLessonTopic = (id: string): boolean => {
  const topics = getPracticalLessonTopics();
  const filtered = topics.filter(t => t.id !== id);
  if (filtered.length === topics.length) return false;
  
  savePracticalLessonTopics(filtered);
  return true;
};

// -------------------------
// Practical Lesson Records Management
// -------------------------
const initialPracticalLessonRecords: PracticalLessonRecord[] = [
  // Student 1 records
  {
    id: 'record-1',
    teacherId: 'teacher-1',
    studentId: 'student-1',
    date: '2022-09-05',
    topicId: 'topic-1',
    comments: 'Erste Fahrstunde: Gute Grundlagen beim Anfahren. Auf das Kupplungsspiel sollte noch mehr geachtet werden. Übung macht den Meister!',
    createdAt: '2022-09-05T10:00:00Z',
  },
  {
    id: 'record-2',
    teacherId: 'teacher-1',
    studentId: 'student-1',
    date: '2022-09-12',
    topicId: 'topic-3',
    comments: 'Parken: Längsparken wird langsam sicherer. Noch etwas mehr Übung nötig.',
    createdAt: '2022-09-12T10:00:00Z',
  },
  {
    id: 'record-3',
    teacherId: 'teacher-1',
    studentId: 'student-1',
    date: '2022-10-20',
    topicId: 'topic-5',
    comments: 'Stadtfahrt: Verkehrsbeobachtung sehr gut. Selbstständiges Fahren verbessert sich deutlich.',
    createdAt: '2022-10-20T14:00:00Z',
  },
  {
    id: 'record-4',
    teacherId: 'teacher-1',
    studentId: 'student-1',
    date: '2022-11-15',
    topicId: 'topic-10',
    comments: 'Autobahnfahrt: Einfädeln und Spurwechsel sehr sicher. Gute Geschwindigkeitskontrolle.',
    createdAt: '2022-11-15T09:00:00Z',
  },
  {
    id: 'record-5',
    teacherId: 'teacher-1',
    studentId: 'student-1',
    date: '2022-12-10',
    topicId: 'topic-13',
    comments: 'Nachtfahrt: Beleuchtung korrekt verwendet. Sehr aufmerksam gefahren.',
    createdAt: '2022-12-10T18:00:00Z',
  },
  // Student 2 records
  {
    id: 'record-6',
    teacherId: 'teacher-1',
    studentId: 'student-2',
    date: '2023-12-05',
    topicId: 'topic-1',
    comments: 'Erste Fahrstunde: Anfahren und Anhalten gut gemeistert. Kupplungsspiel noch etwas unsicher.',
    createdAt: '2023-12-05T14:00:00Z',
  },
  {
    id: 'record-7',
    teacherId: 'teacher-1',
    studentId: 'student-2',
    date: '2024-01-10',
    topicId: 'topic-5',
    comments: 'Stadtfahrt: Die Verkehrsbeobachtung hat sich deutlich verbessert. Weiter so!',
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'record-8',
    teacherId: 'teacher-1',
    studentId: 'student-2',
    date: '2024-02-15',
    topicId: 'topic-7',
    comments: 'Vorfahrt: Rechts vor links wird gut beachtet. Kreisverkehr noch etwas unsicher.',
    createdAt: '2024-02-15T14:00:00Z',
  },
  {
    id: 'record-9',
    teacherId: 'teacher-1',
    studentId: 'student-2',
    date: '2024-03-20',
    topicId: 'topic-3',
    comments: 'Parken: Querparken gut, Längsparken benötigt noch Übung.',
    createdAt: '2024-03-20T10:00:00Z',
  },
  // Student 3 records
  {
    id: 'record-10',
    teacherId: 'teacher-2',
    studentId: 'student-3',
    date: '2023-06-10',
    topicId: 'topic-1',
    comments: 'Erste Fahrstunde auf dem Motorrad: Gute Balance. Anfahren und Anhalten sicher.',
    createdAt: '2023-06-10T11:00:00Z',
  },
  {
    id: 'record-11',
    teacherId: 'teacher-2',
    studentId: 'student-3',
    date: '2023-07-05',
    topicId: 'topic-5',
    comments: 'Stadtfahrt: Verkehrsbeobachtung sehr gut. Kurvenfahren wird sicherer.',
    createdAt: '2023-07-05T11:00:00Z',
  },
  {
    id: 'record-12',
    teacherId: 'teacher-2',
    studentId: 'student-3',
    date: '2023-08-15',
    topicId: 'topic-8',
    comments: 'Überlandfahrt: Gute Geschwindigkeitskontrolle. Kurven werden sicherer angefahren.',
    createdAt: '2023-08-15T09:00:00Z',
  },
  {
    id: 'record-13',
    teacherId: 'teacher-2',
    studentId: 'student-3',
    date: '2023-10-20',
    topicId: 'topic-10',
    comments: 'Autobahnfahrt: Einfädeln und Überholen sehr sicher gemeistert.',
    createdAt: '2023-10-20T10:00:00Z',
  },
  // Student 5 records
  {
    id: 'record-14',
    teacherId: 'teacher-3',
    studentId: 'student-5',
    date: '2023-10-05',
    topicId: 'topic-1',
    comments: 'Erste Fahrstunde Motorrad: Sehr gute Balance und Koordination. Anfahren sehr sicher.',
    createdAt: '2023-10-05T09:00:00Z',
  },
  {
    id: 'record-15',
    teacherId: 'teacher-3',
    studentId: 'student-5',
    date: '2023-10-25',
    topicId: 'topic-5',
    comments: 'Stadtfahrt: Verkehrsbeobachtung ausgezeichnet. Sehr vorausschauend gefahren.',
    createdAt: '2023-10-25T09:00:00Z',
  },
  {
    id: 'record-16',
    teacherId: 'teacher-3',
    studentId: 'student-5',
    date: '2023-11-20',
    topicId: 'topic-8',
    comments: 'Überlandfahrt: Kurvenfahren sehr sicher. Gute Geschwindigkeitsanpassung.',
    createdAt: '2023-11-20T10:00:00Z',
  },
  {
    id: 'record-17',
    teacherId: 'teacher-3',
    studentId: 'student-5',
    date: '2024-01-15',
    topicId: 'topic-10',
    comments: 'Autobahnfahrt: Sehr sicher gefahren. Überholmanöver korrekt ausgeführt.',
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'record-18',
    teacherId: 'teacher-3',
    studentId: 'student-5',
    date: '2024-02-28',
    topicId: 'topic-13',
    comments: 'Nachtfahrt: Beleuchtung korrekt verwendet. Sehr aufmerksam und sicher gefahren.',
    createdAt: '2024-02-28T19:00:00Z',
  },
  // Student 8 records
  {
    id: 'record-19',
    teacherId: 'teacher-2',
    studentId: 'student-8',
    date: '2024-01-10',
    topicId: 'topic-1',
    comments: 'Erste Fahrstunde Motorrad: Gute Balance. Anfahren und Anhalten sicher gemeistert.',
    createdAt: '2024-01-10T15:00:00Z',
  },
  {
    id: 'record-20',
    teacherId: 'teacher-2',
    studentId: 'student-8',
    date: '2024-02-05',
    topicId: 'topic-5',
    comments: 'Stadtfahrt: Verkehrsbeobachtung gut. Kurvenfahren wird sicherer.',
    createdAt: '2024-02-05T15:00:00Z',
  },
  {
    id: 'record-21',
    teacherId: 'teacher-2',
    studentId: 'student-8',
    date: '2024-03-15',
    topicId: 'topic-8',
    comments: 'Überlandfahrt: Gute Geschwindigkeitskontrolle. Kurven werden sicherer angefahren.',
    createdAt: '2024-03-15T15:00:00Z',
  },
  // Student 9 records
  {
    id: 'record-22',
    teacherId: 'teacher-3',
    studentId: 'student-9',
    date: '2024-05-10',
    topicId: 'topic-1',
    comments: 'Erste Fahrstunde: Anfahren und Anhalten gut. Kupplungsspiel noch etwas unsicher.',
    createdAt: '2024-05-10T10:30:00Z',
  },
  {
    id: 'record-23',
    teacherId: 'teacher-3',
    studentId: 'student-9',
    date: '2024-06-05',
    topicId: 'topic-5',
    comments: 'Stadtfahrt: Verkehrsbeobachtung verbessert sich. Weiter so!',
    createdAt: '2024-06-05T10:30:00Z',
  },
  {
    id: 'record-24',
    teacherId: 'teacher-3',
    studentId: 'student-9',
    date: '2024-07-20',
    topicId: 'topic-3',
    comments: 'Parken: Längsparken wird sicherer. Noch etwas mehr Übung nötig.',
    createdAt: '2024-07-20T10:30:00Z',
  },
  // Student 11 records
  {
    id: 'record-25',
    teacherId: 'teacher-2',
    studentId: 'student-11',
    date: '2023-08-15',
    topicId: 'topic-1',
    comments: 'Erste Fahrstunde Motorrad: Sehr gute Balance. Anfahren sehr sicher.',
    createdAt: '2023-08-15T08:00:00Z',
  },
  {
    id: 'record-26',
    teacherId: 'teacher-2',
    studentId: 'student-11',
    date: '2023-09-10',
    topicId: 'topic-5',
    comments: 'Stadtfahrt: Verkehrsbeobachtung ausgezeichnet. Sehr vorausschauend gefahren.',
    createdAt: '2023-09-10T08:00:00Z',
  },
  {
    id: 'record-27',
    teacherId: 'teacher-2',
    studentId: 'student-11',
    date: '2023-10-25',
    topicId: 'topic-8',
    comments: 'Überlandfahrt: Kurvenfahren sehr sicher. Gute Geschwindigkeitsanpassung.',
    createdAt: '2023-10-25T08:00:00Z',
  },
  {
    id: 'record-28',
    teacherId: 'teacher-2',
    studentId: 'student-11',
    date: '2023-12-05',
    topicId: 'topic-10',
    comments: 'Autobahnfahrt: Sehr sicher gefahren. Überholmanöver korrekt ausgeführt.',
    createdAt: '2023-12-05T08:00:00Z',
  },
  {
    id: 'record-29',
    teacherId: 'teacher-2',
    studentId: 'student-11',
    date: '2024-02-10',
    topicId: 'topic-13',
    comments: 'Nachtfahrt: Beleuchtung korrekt verwendet. Sehr aufmerksam gefahren.',
    createdAt: '2024-02-10T19:00:00Z',
  },
  // Student 13 records
  {
    id: 'record-30',
    teacherId: 'teacher-1',
    studentId: 'student-13',
    date: '2024-03-05',
    topicId: 'topic-1',
    comments: 'Erste Fahrstunde: Anfahren und Anhalten gut gemeistert. Kupplungsspiel noch etwas unsicher.',
    createdAt: '2024-03-05T13:00:00Z',
  },
  {
    id: 'record-31',
    teacherId: 'teacher-1',
    studentId: 'student-13',
    date: '2024-04-15',
    topicId: 'topic-5',
    comments: 'Stadtfahrt: Verkehrsbeobachtung hat sich verbessert. Weiter so!',
    createdAt: '2024-04-15T13:00:00Z',
  },
  {
    id: 'record-32',
    teacherId: 'teacher-1',
    studentId: 'student-13',
    date: '2024-05-25',
    topicId: 'topic-7',
    comments: 'Vorfahrt: Rechts vor links wird gut beachtet. Kreisverkehr noch etwas unsicher.',
    createdAt: '2024-05-25T13:00:00Z',
  },
  {
    id: 'record-33',
    teacherId: 'teacher-1',
    studentId: 'student-13',
    date: '2024-07-10',
    topicId: 'topic-3',
    comments: 'Parken: Querparken gut, Längsparken benötigt noch Übung.',
    createdAt: '2024-07-10T13:00:00Z',
  },
  // Student 14 records
  {
    id: 'record-34',
    teacherId: 'teacher-2',
    studentId: 'student-14',
    date: '2023-11-20',
    topicId: 'topic-1',
    comments: 'Erste Fahrstunde Motorrad: Gute Balance. Anfahren sehr sicher.',
    createdAt: '2023-11-20T15:00:00Z',
  },
  {
    id: 'record-35',
    teacherId: 'teacher-2',
    studentId: 'student-14',
    date: '2023-12-15',
    topicId: 'topic-5',
    comments: 'Stadtfahrt: Verkehrsbeobachtung sehr gut. Kurvenfahren wird sicherer.',
    createdAt: '2023-12-15T15:00:00Z',
  },
  {
    id: 'record-36',
    teacherId: 'teacher-2',
    studentId: 'student-14',
    date: '2024-01-25',
    topicId: 'topic-8',
    comments: 'Überlandfahrt: Gute Geschwindigkeitskontrolle. Kurven werden sicherer angefahren.',
    createdAt: '2024-01-25T15:00:00Z',
  },
  {
    id: 'record-37',
    teacherId: 'teacher-2',
    studentId: 'student-14',
    date: '2024-03-10',
    topicId: 'topic-10',
    comments: 'Autobahnfahrt: Einfädeln und Überholen sehr sicher gemeistert.',
    createdAt: '2024-03-10T15:00:00Z',
  },
  // Student 15 records
  {
    id: 'record-38',
    teacherId: 'teacher-3',
    studentId: 'student-15',
    date: '2024-09-15',
    topicId: 'topic-1',
    comments: 'Erste Fahrstunde: Anfahren und Anhalten gut. Kupplungsspiel noch etwas unsicher.',
    createdAt: '2024-09-15T10:00:00Z',
  },
  {
    id: 'record-39',
    teacherId: 'teacher-3',
    studentId: 'student-15',
    date: '2024-10-10',
    topicId: 'topic-5',
    comments: 'Stadtfahrt: Verkehrsbeobachtung verbessert sich. Weiter so!',
    createdAt: '2024-10-10T10:00:00Z',
  },
  {
    id: 'record-40',
    teacherId: 'teacher-3',
    studentId: 'student-15',
    date: '2024-11-20',
    topicId: 'topic-3',
    comments: 'Parken: Längsparken wird sicherer. Noch etwas mehr Übung nötig.',
    createdAt: '2024-11-20T10:00:00Z',
  },
];

export const getPracticalLessonRecords = (): PracticalLessonRecord[] => {
  const stored = localStorage.getItem('practicalLessonRecords');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('practicalLessonRecords', JSON.stringify(initialPracticalLessonRecords));
  return initialPracticalLessonRecords;
};

export const savePracticalLessonRecords = (records: PracticalLessonRecord[]) => {
  localStorage.setItem('practicalLessonRecords', JSON.stringify(records));
};

export const createPracticalLessonRecord = (record: Omit<PracticalLessonRecord, 'id' | 'createdAt'>): PracticalLessonRecord => {
  const records = getPracticalLessonRecords();
  const newRecord: PracticalLessonRecord = {
    ...record,
    id: `record-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  records.push(newRecord);
  savePracticalLessonRecords(records);
  return newRecord;
};

export const updatePracticalLessonRecord = (id: string, updates: Partial<PracticalLessonRecord>): PracticalLessonRecord | null => {
  const records = getPracticalLessonRecords();
  const index = records.findIndex(r => r.id === id);
  if (index === -1) return null;
  
  records[index] = {
    ...records[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  savePracticalLessonRecords(records);
  return records[index];
};

export const deletePracticalLessonRecord = (id: string): boolean => {
  const records = getPracticalLessonRecords();
  const filtered = records.filter(r => r.id !== id);
  if (filtered.length === records.length) return false;
  
  savePracticalLessonRecords(filtered);
  return true;
};

export const getPracticalLessonRecordsByStudent = (studentId: string): PracticalLessonRecord[] => {
  const records = getPracticalLessonRecords();
  return records.filter(r => r.studentId === studentId).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getPracticalLessonRecordsByTeacher = (teacherId: string): PracticalLessonRecord[] => {
  const records = getPracticalLessonRecords();
  return records.filter(r => r.teacherId === teacherId).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getPracticalLessonRecordsByDate = (date: string, teacherId?: string): PracticalLessonRecord[] => {
  const records = getPracticalLessonRecords();
  let filtered = records.filter(r => r.date === date);
  if (teacherId) {
    filtered = filtered.filter(r => r.teacherId === teacherId);
  }
  return filtered.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

