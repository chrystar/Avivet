import type { CaseItem } from '@/types';

export const SEED: CaseItem[] = [{
  id: 'c0', title: 'Batch 3 · Day 14', age: '14', birds: '900', deaths: '4',
  symptoms: ['Bloody', 'Birds lethargic'], notes: 'Started yesterday evening in one pen.',
  photos: [], urgency: 'urgent', sent: 'Last week', status: 'replied',
  reply: {
    vet: 'Dr. Ruth Adams',
    verdict: 'Pattern consistent with coccidiosis',
    body: 'Blood in droppings plus lethargy at this age fits coccidiosis. Separate the affected pen, keep litter dry, and start an anticoccidial in the drinking water as per the label dose. Check again in 48 hours and send a new photo.',
    note: 'Observe the withdrawal period on the product before the birds go to market.',
  },
}];
