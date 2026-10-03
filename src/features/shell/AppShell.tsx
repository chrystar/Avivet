import { Press } from '@/components/Press';
import { SEED } from '@/data/cases';
import { BATCH } from '@/data/config';
import { LoginScreen } from '@/features/auth/LoginScreen';
import { OnboardingScreen } from '@/features/auth/OnboardingScreen';
import { RegisterScreen } from '@/features/auth/RegisterScreen';
import { CaseDetailScreen } from '@/features/cases/CaseDetailScreen';
import { CasesScreen } from '@/features/cases/CasesScreen';
import { NewCaseScreen } from '@/features/cases/NewCaseScreen';
import { HomeScreen } from '@/features/home/HomeScreen';
import { MentorsScreen } from '@/features/mentors/MentorsScreen';
import { ProfileScreen } from '@/features/profile/ProfileScreen';
import { ScanScreen } from '@/features/scan/ScanScreen';
import { VetsScreen } from '@/features/vets/VetsScreen';
import { C } from '@/theme/colors';
import type { CaseItem, Level, NewCaseData, Sub, Tab, ViewState } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TAB_LEFT = [['home', 'home'], ['vets', 'medkit']] as const;
const TAB_RIGHT = [['mentors', 'school'], ['cases', 'document-text'], ['profile', 'person']] as const;
type Stage = 'onboarding' | 'login' | 'register' | 'app';

export function AppShell() {
  const [stage, setStage] = useState<Stage>('onboarding');
  const [user, setUser] = useState('Farmer');
  const [tab, setTab] = useState<Tab>('home');
  const [view, setView] = useState<ViewState>(null);
  const [cases, setCases] = useState<CaseItem[]>(SEED);
  const [sub, setSub] = useState<Sub>(null);
  const [lastScan, setLastScan] = useState<{ title: string; level: Level } | null>(null);

  const enter = (name: string) => { setUser(name); setTab('home'); setStage('app'); };

  const submit = (data: NewCaseData) => {
    const id = 'c' + Date.now();
    const item: CaseItem = { ...data, id, title: `${BATCH.name} · Day ${data.age}`, sent: 'Just now', status: 'waiting', reply: null };
    setCases(p => [item, ...p]);
    setView({ name: 'case', id });
    // Demo only: replace with your backend. Simulates a vet replying after 8 seconds.
    setTimeout(() => {
      setCases(p => p.map((c): CaseItem => c.id === id ? {
        ...c, status: 'replied',
        reply: {
          vet: data.vet ?? 'Dr. Ruth Adams', verdict: 'Sample reply',
          body: 'This is where the vet’s written assessment and advice will appear.',
          note: 'Always follow the withdrawal period on any medication.',
        },
      } : c));
    }, 8000);
  };

  if (stage !== 'app') {
    return (
      <SafeAreaView style={[n.safe, stage === 'onboarding' && { backgroundColor: C.sage }, stage !== 'onboarding' && { backgroundColor: C.card }]}>
        <StatusBar style="dark" />
        {stage === 'onboarding' ? <OnboardingScreen onDone={() => setStage('register')} onLogin={() => setStage('login')} />
          : stage === 'login' ? <LoginScreen onLogin={enter} goRegister={() => setStage('register')} />
          : <RegisterScreen onRegister={enter} goLogin={() => setStage('login')} />}
      </SafeAreaView>
    );
  }

  const current = view?.name === 'case' ? cases.find(c => c.id === view.id) : null;
  const openCase = (id: string) => setView({ name: 'case', id });
  const btn = ([k, icon]: readonly [Tab, string]) => (
    <Press key={k} style={[n.btn, tab === k && n.on]} onPress={() => setTab(k)}>
      <Ionicons name={(tab === k ? icon : `${icon}-outline`) as keyof typeof Ionicons.glyphMap} size={22} color={tab === k ? '#fff' : C.ink} />
    </Press>
  );

  return (
    <SafeAreaView style={n.safe}>
      <StatusBar style="dark" />
      <View style={n.sheet}>
        {view?.name === 'new' ? (
          <NewCaseScreen vet={view.vet} photo={view.photo} onBack={() => setView(null)} onSubmit={submit} />
        ) : view?.name === 'scan' ? (
          <ScanScreen onBack={() => setView(null)} onAskVet={photo => setView({ name: 'new', photo })} onResult={(title, level) => setLastScan({ title, level })} />
        ) : current ? (
          <CaseDetailScreen item={current} onBack={() => setView(null)} />
        ) : (
          <>
            {tab === 'home' && <HomeScreen name={user} cases={cases} lastScan={lastScan} openScan={() => setView({ name: 'scan' })} openCase={openCase} goCases={() => setTab('cases')} goVets={() => setTab('vets')} askVet={vet => setView({ name: 'new', vet })} />}
            {tab === 'vets' && <VetsScreen onAsk={v => setView({ name: 'new', vet: v.name })} />}
            {tab === 'mentors' && <MentorsScreen sub={sub} onSubscribe={(id, plan) => setSub({ id, plan })} onCancel={() => setSub(null)} />}
            {tab === 'cases' && <CasesScreen cases={cases} openCase={openCase} />}
            {tab === 'profile' && <ProfileScreen sub={sub} caseCount={cases.length} onSignOut={() => setStage('login')} />}
          </>
        )}
      </View>
      {view === null && (
        <View style={n.bar}>
          {TAB_LEFT.map(btn)}
          <Press style={n.fab} onPress={() => setView({ name: 'scan' })}>
            <Ionicons name="scan" size={26} color={C.ink} />
          </Press>
          {TAB_RIGHT.map(btn)}
        </View>
      )}
    </SafeAreaView>
  );
}

const n = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  sheet: { flex: 1},
  bar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingBottom: 12 },
  btn: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.card, borderWidth: 1, borderColor: C.line, alignItems: 'center', justifyContent: 'center' },
  on: { backgroundColor: C.pine, borderColor: C.pine },
  fab: { width: 58, height: 58, borderRadius: 29, backgroundColor: C.yellow, alignItems: 'center', justifyContent: 'center' },
});