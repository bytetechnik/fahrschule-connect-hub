import type { Lesson } from '@/types';

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

