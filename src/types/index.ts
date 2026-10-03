export type Urgency = 'routine' | 'urgent';

export type Status = 'waiting' | 'replied';

export type Reply = { vet: string; verdict: string; body: string; note: string };

export type CaseItem = {
  id: string; title: string; age: string; birds: string; deaths: string;
  symptoms: string[]; notes: string; photos: string[]; urgency: Urgency;
  sent: string; status: Status; reply: Reply | null; vet?: string;
};

export type NewCaseData = Omit<CaseItem, 'id' | 'title' | 'sent' | 'status' | 'reply'>;

export type ViewState =
  | { name: 'new'; vet?: string; photo?: string }
  | { name: 'scan' }
  | { name: 'case'; id: string }
  | null;

export type Tab = 'home' | 'vets' | 'mentors' | 'cases' | 'profile';

export type Plan = 'batch' | 'month';

export type Sub = { id: string; plan: Plan } | null;

export type Vet = {
  id: string; name: string; spec: string; years: number; rating: number; online: boolean;
  fee: number; batchPrice: number; monthPrice: number; slots: number; about: string;
};

export type Level = 'green' | 'amber' | 'red';
