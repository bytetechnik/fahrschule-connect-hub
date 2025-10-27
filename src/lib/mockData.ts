export interface Teacher {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  teacherId: string;
  validityDate: string;
  status: 'active' | 'expired';
  progress: number;
  licenseClass: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  videoUrl: string;
  thumbnail: string;
  videos?: { title: string; url: string }[];
  documents?: { name: string; url: string; type: string }[];
}

export interface Progress {
  studentId: string;
  lessonId: string;
  completed: boolean;
  completedDate?: string;
}

export interface Appointment {
  id: string;
  teacherId: string;
  studentId: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'cancelled';
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending';
  description: string;
}

export interface Discussion {
  id: string;
  lessonId: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
}

export interface TeacherAvailability {
  id: string;
  teacherId: string;
  date: string;
  timeSlots: {
    time: string;
    available: boolean;
    bookedBy?: string;
  }[];
}

export const mockTeachers: Teacher[] = [
  { id: 'teacher-1', name: 'Max Müller', email: 'teacher@fahrschule.de', status: 'active' },
  { id: 'teacher-2', name: 'Julia Schneider', email: 'julia.schneider@fahrschule.de', status: 'active' },
  { id: 'teacher-3', name: 'Thomas Bauer', email: 'thomas.bauer@fahrschule.de', status: 'active' }
];

export const mockStudents: Student[] = [
  { id: 'student-1', name: 'Anna Schmidt', email: 'student@fahrschule.de', teacherId: 'teacher-1', validityDate: '2025-12-31', status: 'active', progress: 100, licenseClass: 'B' },
  { id: 'student-2', name: 'Lucas Weber', email: 'lucas.weber@example.com', teacherId: 'teacher-1', validityDate: '2025-11-30', status: 'active', progress: 50, licenseClass: 'B' },
  { id: 'student-3', name: 'Emma Meyer', email: 'emma.meyer@example.com', teacherId: 'teacher-2', validityDate: '2026-01-15', status: 'active', progress: 75, licenseClass: 'A2' },
  { id: 'student-4', name: 'Noah Wagner', email: 'noah.wagner@example.com', teacherId: 'teacher-2', validityDate: '2025-10-20', status: 'active', progress: 25, licenseClass: 'BE' },
  { id: 'student-5', name: 'Mia Fischer', email: 'mia.fischer@example.com', teacherId: 'teacher-3', validityDate: '2025-12-15', status: 'active', progress: 60, licenseClass: 'A' },
  { id: 'student-6', name: 'Leon Becker', email: 'leon.becker@example.com', teacherId: 'teacher-3', validityDate: '2025-09-30', status: 'active', progress: 40, licenseClass: 'C1' }
];

export const mockLessons: Lesson[] = [
  // Allgemeiner Teil - Grundstoff
  {
    id: 'lesson-1',
    title: 'Persönliche Voraussetzungen',
    titleEn: 'Personal Prerequisites',
    description: 'Fahrtüchtigkeit, Alkohol, Drogen, Medikamente, Müdigkeit',
    descriptionEn: 'Fitness to drive, alcohol, drugs, medication, fatigue',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=225&fit=crop',
    videos: [
      { title: 'Alkohol und Drogen im Straßenverkehr', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Müdigkeit und Medikamente', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Gesundheitliche Voraussetzungen.pdf', url: '#', type: 'PDF' },
      { name: 'Alkoholgrenzwerte.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-2',
    title: 'Risikofaktoren im Straßenverkehr',
    titleEn: 'Risk Factors in Road Traffic',
    description: 'Typische Gefahren, Verhalten anderer Fahrer, Stress, Ablenkung',
    descriptionEn: 'Typical hazards, behavior of other drivers, stress, distraction',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=225&fit=crop',
    videos: [
      { title: 'Ablenkung durch Smartphone', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Stress im Straßenverkehr', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Risikofaktoren-Übersicht.pdf', url: '#', type: 'PDF' },
      { name: 'Ablenkungsstatistik.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Verkehrszeichen und Verkehrseinrichtungen',
    titleEn: 'Traffic Signs and Road Equipment',
    description: 'Bedeutung von Verkehrsschildern, Signalen und Markierungen',
    descriptionEn: 'Meaning of road signs, signals, and markings',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=225&fit=crop',
    videos: [
      { title: 'Verkehrszeichen Teil 1: Gefahrzeichen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Verkehrszeichen Teil 2: Vorschriftzeichen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Verkehrszeichen Teil 3: Richtzeichen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Verkehrszeichen-Katalog.pdf', url: '#', type: 'PDF' },
      { name: 'Fahrbahnmarkierungen.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-4',
    title: 'Vorfahrt und Vorrang',
    titleEn: 'Right of Way and Priority',
    description: 'Vorfahrtsregelungen, besondere Situationen und Ausnahmen',
    descriptionEn: 'Right-of-way rules, special situations, and exceptions',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop',
    videos: [
      { title: 'Grundregeln der Vorfahrt', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Rechts vor Links', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Kreisverkehr und Vorfahrt', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Vorfahrtsregeln-Übersicht.pdf', url: '#', type: 'PDF' },
      { name: 'Kreuzungen und Einmündungen.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-5',
    title: 'Verkehrsregelungen beim Überholen, Halten, Parken',
    titleEn: 'Traffic Rules for Overtaking, Stopping, Parking',
    description: 'Überholen, Anhalten, Parken und Fahrstreifenbenutzung',
    descriptionEn: 'Passing, stopping, parking, and lane usage',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&h=225&fit=crop',
    videos: [
      { title: 'Sicheres Überholen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Halten und Parken', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Überholverbote.pdf', url: '#', type: 'PDF' },
      { name: 'Halte- und Parkverbote.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-6',
    title: 'Geschwindigkeit, Abstand und umweltbewusstes Fahren',
    titleEn: 'Speed, Distance and Eco-Driving',
    description: 'Geschwindigkeitsbegrenzungen, Sicherheitsabstand, umweltfreundliches Fahren',
    descriptionEn: 'Speed limits, safe distance, eco-driving principles',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=225&fit=crop',
    videos: [
      { title: 'Geschwindigkeitsregeln', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Sicherheitsabstand berechnen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Spritsparend fahren', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Geschwindigkeitsbegrenzungen.pdf', url: '#', type: 'PDF' },
      { name: 'Abstandsregeln.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-7',
    title: 'Verhalten gegenüber Fußgängern und Radfahrern',
    titleEn: 'Behavior Towards Pedestrians and Cyclists',
    description: 'Gemeinsame Straßennutzung, Fußgängerüberwege, Radwege',
    descriptionEn: 'Shared road use, pedestrian crossings, bike lanes',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=225&fit=crop',
    videos: [
      { title: 'Rücksicht auf Radfahrer', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Fußgängerüberwege', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Schutz schwächerer Verkehrsteilnehmer.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-8',
    title: 'Fahrbahnbenutzung, Einordnen, Abbiegen, Wenden',
    titleEn: 'Lane Usage, Positioning, Turning, U-turns',
    description: 'Fahrstreifenwahl, Blinken, Abbiegen und Wenden',
    descriptionEn: 'Lane choice, signaling, turning, and U-turns',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=225&fit=crop',
    videos: [
      { title: 'Richtig Einordnen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Links und Rechts Abbiegen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Abbiegevorgänge.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-9',
    title: 'Verhalten an Bahnübergängen und besonderen Gefahrenstellen',
    titleEn: 'Behavior at Railroad Crossings and Hazard Areas',
    description: 'Bahnübergänge, Baustellen und Gefahrenbereiche',
    descriptionEn: 'Railroad crossings, construction zones, and emergency areas',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop',
    videos: [
      { title: 'Sicheres Verhalten an Bahnübergängen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Baustellen passieren', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Bahnübergänge-Regelungen.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-10',
    title: 'Verhalten bei besonderen Situationen',
    titleEn: 'Behavior in Special Situations',
    description: 'Staus, Unfälle, Fahrzeugpannen',
    descriptionEn: 'Traffic jams, accidents, vehicle breakdowns',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&h=225&fit=crop',
    videos: [
      { title: 'Rettungsgasse bilden', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Verhalten bei Panne', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Notfallverhalten.pdf', url: '#', type: 'PDF' },
      { name: 'Absicherung-Unfallstelle.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-11',
    title: 'Umweltbewusstes und energiesparendes Fahren',
    titleEn: 'Eco-friendly and Energy-efficient Driving',
    description: 'Vermeidung unnötiger Emissionen und Verschleiß',
    descriptionEn: 'Avoiding unnecessary emissions and wear',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=225&fit=crop',
    videos: [
      { title: 'Spritsparend Fahren', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Umweltschutz im Verkehr', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Eco-Driving-Tipps.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-12',
    title: 'Bußgeld, Punkte, Verkehrsstrafen',
    titleEn: 'Fines, Points, Traffic Penalties',
    description: 'Bußgelder, Punktesystem (Flensburg), Konsequenzen',
    descriptionEn: 'Penalties, point system (Flensburg), consequences',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=225&fit=crop',
    videos: [
      { title: 'Das Punktesystem', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Bußgeldkatalog', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Bußgeldkatalog-2025.pdf', url: '#', type: 'PDF' },
      { name: 'Punktesystem-Flensburg.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-13',
    title: 'Technische Kontrolle und Wartung',
    titleEn: 'Technical Control and Maintenance',
    description: 'Beleuchtung, Bremsen, Reifen, Sicherheitschecks',
    descriptionEn: 'Lights, brakes, tires, safety checks',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=225&fit=crop',
    videos: [
      { title: 'Fahrzeugcheck vor Fahrtantritt', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Reifenkontrolle', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Wartungsplan.pdf', url: '#', type: 'PDF' },
      { name: 'TÜV-und-HU.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-14',
    title: 'Verhalten gegenüber Polizei und Rettungsdiensten',
    titleEn: 'Behavior Towards Police and Emergency Services',
    description: 'Rechte, Pflichten und Rettungsgassen-Regelungen',
    descriptionEn: 'Rights, duties, and emergency lane rules',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop',
    videos: [
      { title: 'Verkehrskontrolle richtig verhalten', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Rettungsgasse bilden', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Rechte-bei-Verkehrskontrolle.pdf', url: '#', type: 'PDF' }
    ]
  },
  // Zusatzstoff Klasse B
  {
    id: 'lesson-15',
    title: 'Fahrzeugtechnik und Sicherheitsausstattung',
    titleEn: 'Vehicle Technology and Safety Equipment',
    description: 'ABS, ESP, Airbags, Gurte und moderne Fahrerassistenzsysteme',
    descriptionEn: 'ABS, ESP, airbags, seatbelts, and modern driver assistance systems',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&h=225&fit=crop',
    videos: [
      { title: 'ABS und ESP erklärt', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Airbag-Systeme', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Fahrerassistenzsysteme.pdf', url: '#', type: 'PDF' },
      { name: 'Sicherheitsausstattung-Übersicht.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-16',
    title: 'Fahrzeugbedienung und Kontrolle',
    titleEn: 'Vehicle Operation and Control',
    description: 'Bedienung von Lenkung, Pedalen, Blinker, Spiegel und Instrumenten',
    descriptionEn: 'Operation of steering, pedals, indicators, mirrors, and dashboard instruments',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=225&fit=crop',
    videos: [
      { title: 'Sitzposition und Spiegeleinstellung', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Cockpit-Übersicht', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Bedienelemente-Übersicht.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-17',
    title: 'Fahrphysik und Fahrverhalten des Pkw',
    titleEn: 'Driving Physics and Car Behavior',
    description: 'Bremsen, Beschleunigen, Kurvenfahrt, Traktion und Ladungseinfluss',
    descriptionEn: 'Braking, acceleration, cornering, traction, and load influence',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=225&fit=crop',
    videos: [
      { title: 'Bremswege verstehen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Kurvenfahrt und Fliehkraft', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Fahrphysik-Grundlagen.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-18',
    title: 'Beladung und Sicherung der Ladung',
    titleEn: 'Loading and Cargo Securing',
    description: 'Lastverteilung, Ladungssicherung, zulässige Gewichte',
    descriptionEn: 'Load distribution, securing cargo, permissible weights',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=225&fit=crop',
    videos: [
      { title: 'Richtig beladen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Ladungssicherung', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Ladungssicherung-Vorschriften.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-19',
    title: 'Anhängerbetrieb (Kombinationen mit Anhänger)',
    titleEn: 'Trailer Operation',
    description: 'Anhängervorschriften, Kupplung, zusätzliche Spiegel und Geschwindigkeitsbegrenzungen',
    descriptionEn: 'Trailer rules, coupling, additional mirrors, and speed limits',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop',
    videos: [
      { title: 'Anhänger ankuppeln', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Fahren mit Anhänger', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Anhänger-Vorschriften.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-20',
    title: 'Sicht und Beleuchtungseinrichtungen',
    titleEn: 'Visibility and Lighting Systems',
    description: 'Scheinwerfer, Nebelscheinwerfer, Sicht bei Dunkelheit oder schlechtem Wetter',
    descriptionEn: 'Headlights, fog lights, visibility in darkness or poor weather',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&h=225&fit=crop',
    videos: [
      { title: 'Beleuchtung richtig einstellen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Fahren bei schlechter Sicht', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Beleuchtungsvorschriften.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-21',
    title: 'Verhalten gegenüber anderen Verkehrsteilnehmern',
    titleEn: 'Behavior Towards Other Road Users',
    description: 'Höflichkeit, Straße teilen mit Motorradfahrern, Radfahrern, Fußgängern und Lkw',
    descriptionEn: 'Courtesy, sharing the road with motorcyclists, cyclists, pedestrians, and trucks',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=225&fit=crop',
    videos: [
      { title: 'Toter Winkel bei Lkw', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Partnerschaftliches Verhalten', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Rücksichtnahme-im-Verkehr.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-22',
    title: 'Fahren mit automatisierten Fahrhilfen / Fahrerassistenzsystemen',
    titleEn: 'Driving with Automated Assistance Systems',
    description: 'Adaptiver Tempomat, Spurhalteassistent, Parkassistent, etc.',
    descriptionEn: 'Adaptive cruise control, lane assist, parking assist, etc.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=225&fit=crop',
    videos: [
      { title: 'Adaptiver Tempomat nutzen', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Spurhalteassistent erklärt', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Fahrerassistenzsysteme-Handbuch.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-23',
    title: 'Besonderheiten beim Fahren mit Kindern und älteren Personen',
    titleEn: 'Special Considerations with Children and Elderly Persons',
    description: 'Kindersitze, Sicherheitssysteme, Bewusstsein für ältere Fahrer',
    descriptionEn: 'Child seats, safety systems, awareness of elderly drivers',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=225&fit=crop',
    videos: [
      { title: 'Kindersitze richtig montieren', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Sicherheit für Kinder im Auto', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Kindersitz-Vorschriften.pdf', url: '#', type: 'PDF' }
    ]
  },
  {
    id: 'lesson-24',
    title: 'Umweltbewusstes und wirtschaftliches Fahren mit Pkw',
    titleEn: 'Eco-friendly and Economical Car Driving',
    description: 'Effizienter Fahrstil, Start-Stopp-Systeme, Reifendruck, Wartung',
    descriptionEn: 'Efficient driving style, start-stop systems, tire pressure, maintenance',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop',
    videos: [
      { title: 'Kraftstoff sparen durch richtiges Fahren', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Wartung für Effizienz', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ],
    documents: [
      { name: 'Spritsparen-Tipps.pdf', url: '#', type: 'PDF' },
      { name: 'Umweltfreundlich-Fahren.pdf', url: '#', type: 'PDF' }
    ]
  }
];

const initialProgress: Progress[] = [
  { studentId: 'student-1', lessonId: 'lesson-1', completed: true, completedDate: '2025-01-15' },
  { studentId: 'student-1', lessonId: 'lesson-2', completed: true, completedDate: '2025-01-18' },
  { studentId: 'student-1', lessonId: 'lesson-3', completed: true, completedDate: '2025-01-22' },
  { studentId: 'student-1', lessonId: 'lesson-4', completed: true, completedDate: '2025-01-25' },
  { studentId: 'student-1', lessonId: 'lesson-5', completed: true, completedDate: '2025-01-28' },
  { studentId: 'student-2', lessonId: 'lesson-1', completed: true, completedDate: '2025-02-01' },
  { studentId: 'student-2', lessonId: 'lesson-2', completed: true, completedDate: '2025-02-05' },
  { studentId: 'student-2', lessonId: 'lesson-3', completed: true, completedDate: '2025-02-10' },
];

const initialAppointments: Appointment[] = [
  { id: 'apt-1', teacherId: 'teacher-1', studentId: 'student-1', date: '2025-02-15', time: '10:00', status: 'approved' },
  { id: 'apt-2', teacherId: 'teacher-1', studentId: 'student-2', date: '2025-02-16', time: '14:00', status: 'pending' },
  { id: 'apt-3', teacherId: 'teacher-2', studentId: 'student-3', date: '2025-02-17', time: '11:00', status: 'approved' },
  { id: 'apt-4', teacherId: 'teacher-1', studentId: 'student-1', date: '2025-01-20', time: '15:00', status: 'approved' },
];

const initialPayments: Payment[] = [
  { id: 'pay-1', studentId: 'student-1', amount: 450, date: '2025-01-10', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-2', studentId: 'student-2', amount: 450, date: '2025-01-15', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-3', studentId: 'student-3', amount: 450, date: '2025-01-20', status: 'paid', description: 'Theoriepaket' },
  { id: 'pay-4', studentId: 'student-1', amount: 200, date: '2025-02-01', status: 'paid', description: 'Fahrstunden Paket 1' },
];

const initialDiscussions: Discussion[] = [
  {
    id: 'disc-1',
    lessonId: 'lesson-1',
    userId: 'student-1',
    userName: 'Anna Schmidt',
    message: 'Sehr informative Lektion! Ich habe eine Frage zur Vorfahrt an Kreuzungen.',
    timestamp: '2025-01-15T14:30:00'
  },
  {
    id: 'disc-2',
    lessonId: 'lesson-1',
    userId: 'teacher-1',
    userName: 'Max Müller',
    message: 'Gute Frage! An einer Kreuzung gilt: Rechts vor links, sofern keine Verkehrszeichen anderes bestimmen.',
    timestamp: '2025-01-15T15:00:00'
  }
];

export const getProgress = (): Progress[] => {
  const stored = localStorage.getItem('progress');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('progress', JSON.stringify(initialProgress));
  return initialProgress;
};

export const saveProgress = (progress: Progress[]) => {
  localStorage.setItem('progress', JSON.stringify(progress));
};

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

export const getStudents = (): Student[] => {
  const stored = localStorage.getItem('students');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('students', JSON.stringify(mockStudents));
  return mockStudents;
};

export const saveStudents = (students: Student[]) => {
  localStorage.setItem('students', JSON.stringify(students));
};

export const createStudent = (student: Omit<Student, 'id'>): Student => {
  const students = getStudents();
  const newStudent: Student = {
    ...student,
    id: `student-${Date.now()}`,
  };
  students.push(newStudent);
  saveStudents(students);
  return newStudent;
};

export const updateStudent = (id: string, updates: Partial<Student>): Student | null => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  students[index] = { ...students[index], ...updates };
  saveStudents(students);
  return students[index];
};

export const deleteStudent = (id: string): boolean => {
  const students = getStudents();
  const filtered = students.filter(s => s.id !== id);
  if (filtered.length === students.length) return false;
  
  saveStudents(filtered);
  return true;
};

export const getTeachers = (): Teacher[] => {
  const stored = localStorage.getItem('teachers');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('teachers', JSON.stringify(mockTeachers));
  return mockTeachers;
};

export const saveTeachers = (teachers: Teacher[]) => {
  localStorage.setItem('teachers', JSON.stringify(teachers));
};

export const createTeacher = (teacher: Omit<Teacher, 'id'>): Teacher => {
  const teachers = getTeachers();
  const newTeacher: Teacher = {
    ...teacher,
    id: `teacher-${Date.now()}`,
  };
  teachers.push(newTeacher);
  saveTeachers(teachers);
  return newTeacher;
};

export const updateTeacher = (id: string, updates: Partial<Teacher>): Teacher | null => {
  const teachers = getTeachers();
  const index = teachers.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  teachers[index] = { ...teachers[index], ...updates };
  saveTeachers(teachers);
  return teachers[index];
};

export const deleteTeacher = (id: string): boolean => {
  const teachers = getTeachers();
  const filtered = teachers.filter(t => t.id !== id);
  if (filtered.length === teachers.length) return false;
  
  saveTeachers(filtered);
  return true;
};

export const getLessons = (): Lesson[] => {
  const stored = localStorage.getItem('lessons');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('lessons', JSON.stringify(mockLessons));
  return mockLessons;
};

export const saveLessons = (lessons: Lesson[]) => {
  localStorage.setItem('lessons', JSON.stringify(lessons));
};

export const createLesson = (lesson: Omit<Lesson, 'id'>): Lesson => {
  const lessons = getLessons();
  const newLesson: Lesson = {
    ...lesson,
    id: `lesson-${Date.now()}`,
  };
  lessons.push(newLesson);
  saveLessons(lessons);
  return newLesson;
};

export const updateLesson = (id: string, updates: Partial<Lesson>): Lesson | null => {
  const lessons = getLessons();
  const index = lessons.findIndex(l => l.id === id);
  if (index === -1) return null;
  
  lessons[index] = { ...lessons[index], ...updates };
  saveLessons(lessons);
  return lessons[index];
};

export const deleteLesson = (id: string): boolean => {
  const lessons = getLessons();
  const filtered = lessons.filter(l => l.id !== id);
  if (filtered.length === lessons.length) return false;
  
  saveLessons(filtered);
  return true;
};

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
