import { C } from '@/theme/colors';
import type { Level } from '@/types';

export const LEVEL = {
  green: { bg: C.pineSoft, fg: C.pine, label: 'Looks normal' },
  amber: { bg: C.amberSoft, fg: C.amber, label: 'Watch closely' },
  red: { bg: C.redSoft, fg: C.red, label: 'See a vet now' },
};

export const RESULTS: { level: Level; title: string; conf: number; causes: string[]; advice: string }[] = [
  { level: 'green', title: 'No clear warning signs', conf: 82, causes: ['Brown dropping with a white cap is normal', 'Consistency suits the bird age'], advice: 'Keep monitoring daily and scan again if anything changes.' },
  { level: 'amber', title: 'Possible digestive upset', conf: 64, causes: ['Watery or foamy droppings', 'Can follow feed or water changes', 'Can also be an early infection'], advice: 'Check water quality and recent feed changes, then scan again in 12 hours. Ask a vet if it continues.' },
  { level: 'red', title: 'Possible serious infection', conf: 71, causes: ['Blood or unusual colour in droppings', 'Needs a vet to confirm the cause'], advice: 'Separate affected birds and ask a vet now. Do not start medication without advice.' },
];
