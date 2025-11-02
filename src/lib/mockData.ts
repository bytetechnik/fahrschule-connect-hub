import type {
  Teacher,
  Student,
  Product,
  Lesson,
  Progress,
  Appointment,
  Payment,
  Discussion,
  TeacherAvailability,
  StudentProcess,
  StudentTickets,
  PracticalLessonTopic,
  PracticalLessonRecord,
} from '@/types';

export type { Teacher, Student, Product, Lesson, Progress, Appointment, Payment, Discussion, TeacherAvailability, StudentProcess, StudentTickets, PracticalLessonTopic, PracticalLessonRecord } from '@/types';

export const mockTeachers: Teacher[] = [
  { id: 'teacher-1', name: 'Max Müller', email: 'teacher@fahrschule.de', status: 'active' },
  { id: 'teacher-2', name: 'Julia Schneider', email: 'julia.schneider@fahrschule.de', status: 'active' },
  { id: 'teacher-3', name: 'Thomas Bauer', email: 'thomas.bauer@fahrschule.de', status: 'active' }
];

export const mockStudents: Student[] = [
  { id: 'student-1', name: 'Anna Schmidt', email: 'student@fahrschule.de', teacherId: 'teacher-1', validityDate: '2025-12-31', status: 'active', progress: 100, licenseClass: 'B', joiningDate: '2023-01-15' },
  { id: 'student-2', name: 'Lucas Weber', email: 'lucas.weber@example.com', teacherId: 'teacher-1', validityDate: '2025-11-30', status: 'active', progress: 50, licenseClass: 'B', joiningDate: '2024-03-20' },
  { id: 'student-3', name: 'Emma Meyer', email: 'emma.meyer@example.com', teacherId: 'teacher-2', validityDate: '2026-01-15', status: 'active', progress: 75, licenseClass: 'A2', joiningDate: '2024-06-10' },
  { id: 'student-4', name: 'Noah Wagner', email: 'noah.wagner@example.com', teacherId: 'teacher-2', validityDate: '2025-10-20', status: 'active', progress: 25, licenseClass: 'BE', joiningDate: '2025-01-05' },
  { id: 'student-5', name: 'Mia Fischer', email: 'mia.fischer@example.com', teacherId: 'teacher-3', validityDate: '2025-12-15', status: 'active', progress: 60, licenseClass: 'A', joiningDate: '2024-09-12' },
  { id: 'student-6', name: 'Leon Becker', email: 'leon.becker@example.com', teacherId: 'teacher-3', validityDate: '2025-09-30', status: 'active', progress: 40, licenseClass: 'C1', joiningDate: '2025-02-18' }
];

const mockProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Theorie App',
    nameEn: 'Theory App',
    description: 'Zugang zur Theorie-Lern-App',
    descriptionEn: 'Access to theory learning app',
    type: 'theory-app',
    basePriceByYear: [
      { year: '2023', price: 45 },
      { year: '2024', price: 50 },
      { year: '2025', price: 55 }
    ]
  },
  {
    id: 'product-2',
    name: 'Fahrstunde (45 Min)',
    nameEn: 'Driving Lesson (45 min)',
    description: 'Eine praktische Fahrstunde (45 Minuten)',
    descriptionEn: 'One practical driving lesson (45 minutes)',
    type: 'driving-lesson',
    basePriceByYear: [
      { year: '2023', price: 60 },
      { year: '2024', price: 65 },
      { year: '2025', price: 70 }
    ]
  },
  {
    id: 'product-3',
    name: 'Theorieprüfung',
    nameEn: 'Theory Exam',
    description: 'Anmeldung zur theoretischen Prüfung',
    descriptionEn: 'Registration for theory exam',
    type: 'theory-exam',
    basePriceByYear: [
      { year: '2023', price: 30 },
      { year: '2024', price: 35 },
      { year: '2025', price: 40 }
    ]
  },
  {
    id: 'product-4',
    name: 'Praktische Prüfung',
    nameEn: 'Practical Exam',
    description: 'Anmeldung zur praktischen Prüfung',
    descriptionEn: 'Registration for practical exam',
    type: 'practical-exam',
    basePriceByYear: [
      { year: '2023', price: 150 },
      { year: '2024', price: 160 },
      { year: '2025', price: 170 }
    ]
  }
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
    const storedLessons = JSON.parse(stored);
    // Merge with mockLessons to ensure all default lessons are present
    const mockLessonIds = new Set(mockLessons.map(l => l.id));
    const customLessons = storedLessons.filter((l: Lesson) => !mockLessonIds.has(l.id));
    const mergedLessons = [...mockLessons, ...customLessons];
    localStorage.setItem('lessons', JSON.stringify(mergedLessons));
    return mergedLessons;
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

export const clearAvailability = () => {
  localStorage.setItem('availability', JSON.stringify([]));
};

// Product management functions
export const getProducts = (): Product[] => {
  const stored = localStorage.getItem('products');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('products', JSON.stringify(mockProducts));
  return mockProducts;
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

export const createProduct = (data: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct = {
    ...data,
    id: `product-${Date.now()}`
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  
  saveProducts(filtered);
  return true;
};

export const getProductPriceForStudent = (product: Product, student: Student): number => {
  // Check for custom price first
  if (product.customPrices) {
    const customPrice = product.customPrices.find(cp => cp.studentId === student.id);
    if (customPrice) return customPrice.price;
  }
  
  // Get price based on joining year
  const joiningYear = new Date(student.joiningDate).getFullYear().toString();
  const priceEntry = product.basePriceByYear.find(p => p.year === joiningYear);
  
  // Return the year-specific price or the latest price
  if (priceEntry) return priceEntry.price;
  
  // Fallback to latest year price
  const latestPrice = product.basePriceByYear.sort((a, b) => 
    parseInt(b.year) - parseInt(a.year)
  )[0];
  
  return latestPrice?.price || 0;
};

// -------------------------
// Student Tickets Management
// -------------------------
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

// -------------------------
// Practical Lesson Topics Management
// -------------------------
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
  {
    id: 'record-1',
    teacherId: 'teacher-1',
    studentId: 'student-1',
    date: new Date().toISOString().split('T')[0],
    topicId: 'topic-1',
    comments: 'Gute Fortschritte beim Anfahren. Auf das Kupplungsspiel sollte noch mehr geachtet werden.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'record-2',
    teacherId: 'teacher-1',
    studentId: 'student-2',
    date: new Date().toISOString().split('T')[0],
    topicId: 'topic-5',
    comments: 'Verkehrsbeobachtung verbessert sich. Weiter so!',
    createdAt: new Date().toISOString(),
  }
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
