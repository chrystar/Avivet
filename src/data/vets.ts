import type { Vet } from '@/types';

// Sample data: replace with your backend
export const VETS: Vet[] = [
  { id: 'v1', name: 'Dr. Ruth Adams', spec: 'Broiler disease and flock health', years: 12, rating: 4.9, online: true, fee: 5, batchPrice: 60, monthPrice: 35, slots: 3, about: 'Early disease detection and vaccination planning for commercial broilers.' },
  { id: 'v2', name: 'Dr. Daniel Mensah', spec: 'Gut health and nutrition', years: 9, rating: 4.8, online: true, fee: 4, batchPrice: 50, monthPrice: 30, slots: 5, about: 'Helps farmers fix feed, water and litter problems that drive digestive disease.' },
  { id: 'v3', name: 'Dr. Grace Bello', spec: 'Respiratory and viral diseases', years: 15, rating: 4.9, online: false, fee: 6, batchPrice: 75, monthPrice: 45, slots: 2, about: 'Specialises in outbreaks, biosecurity and vaccination programmes.' },
  { id: 'v4', name: 'Dr. Peter Njoroge', spec: 'New farmer coaching', years: 7, rating: 4.7, online: true, fee: 3, batchPrice: 40, monthPrice: 25, slots: 8, about: 'Patient, practical guidance for first and second batches.' },
  { id: 'v5', name: 'Dr. Amina Yusuf', spec: 'Large flocks and farm management', years: 11, rating: 4.8, online: false, fee: 5, batchPrice: 65, monthPrice: 40, slots: 1, about: 'Mortality reduction and growth performance on flocks above 2,000 birds.' },
];
