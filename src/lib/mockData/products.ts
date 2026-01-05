import type { Product, Student } from '@/types';

const mockProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Theorie-App',
    nameEn: 'Theory App',
    description: 'Zugang zur Theorie-Lern-App für die gesamte Ausbildungsdauer',
    descriptionEn: 'Access to theory learning app for the entire training period',
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
    description: 'Eine praktische Fahrstunde à 45 Minuten',
    descriptionEn: 'One practical driving lesson of 45 minutes',
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
    description: 'Anmeldung zur theoretischen Führerscheinprüfung',
    descriptionEn: 'Registration for theory driving test',
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
    description: 'Anmeldung zur praktischen Führerscheinprüfung',
    descriptionEn: 'Registration for practical driving test',
    type: 'practical-exam',
    basePriceByYear: [
      { year: '2023', price: 150 },
      { year: '2024', price: 160 },
      { year: '2025', price: 170 }
    ]
  }
];

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

