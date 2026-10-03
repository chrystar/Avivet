import { Avatar } from '@/components/Avatar';
import { CaseRow } from '@/components/CaseRow';
import { Press } from '@/components/Press';
import { Text } from '@/components/Text';
import { CURRENCY } from '@/data/config';
import { VETS } from '@/data/vets';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import type { CaseItem, Level } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from 'react-native';

// General information only. Have a vet review this content before launch.
const DOT = { green: '#7BD389', amber: '#F2B43A', red: '#FF8A7A' };
const GUIDE = [
  { title: 'Normal', color: '#7A5A3A', text: 'Brown with a small white cap, firm but moist.' },
  { title: 'Watery', color: '#B9C7BF', text: 'Wet and runny. Can follow feed or water changes, or an infection.' },
  { title: 'Bloody', color: '#B3392F', text: 'Red or dark streaks. Can point to a serious infection, so ask a vet quickly.' },
  { title: 'Green or foamy', color: '#6FA36B', text: 'Can come from stress, eating less, or illness.' },
];

export function HomeScreen({ name, cases, lastScan, openScan, openCase, goCases, goVets, askVet }: {
  name: string; cases: CaseItem[]; lastScan: { title: string; level: Level } | null;
  openScan: () => void; openCase: (id: string) => void; goCases: () => void; goVets: () => void; askVet: (vet: string) => void;
}) {
  const online = VETS.filter(v => v.online);
  return (
    <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
      <View style={h.top}>
        <View style={h.circle}>
          <Ionicons name="notifications-outline" size={20} color={C.ink} />
          <View style={h.badge} />
        </View>
        <View style={[h.circle, { backgroundColor: C.pine, borderColor: C.pine }]}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>{name.slice(0, 1).toUpperCase()}</Text>
        </View>
      </View>
      <Text style={h.hello}>Hello, {name}!</Text>

      <View style={h.hero}>
        <Text style={h.heroTitle}>Check your flock in seconds</Text>
        <Text style={h.heroSub}>Photograph droppings and get a first check before things get worse.</Text>
        <Press style={h.heroBtn} onPress={openScan}>
          <Ionicons name="scan" size={20} color={C.ink} />
          <Text style={h.heroBtnText}>Scan droppings</Text>
        </Press>
        {lastScan ? (
          <View style={h.last}>
            <View style={[h.lastDot, { backgroundColor: DOT[lastScan.level] }]} />
            <Text style={h.lastText}>Last scan: {lastScan.title}</Text>
          </View>
        ) : null}
      </View>

      {cases.length > 0 && (
        <>
          <View style={s.sectionHead}>
            <Text style={h.h2}>Your latest case</Text>
            <Press onPress={goCases}><Text style={s.link}>See all</Text></Press>
          </View>
          <CaseRow item={cases[0]} onPress={() => openCase(cases[0].id)} />
        </>
      )}

      <View style={s.sectionHead}>
        <Text style={h.h2}>Vets online now</Text>
        <Press onPress={goVets}><Text style={s.link}>See all</Text></Press>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -22 }} contentContainerStyle={{ paddingHorizontal: 22, gap: 10 }}>
        {online.map(v => (
          <Press key={v.id} style={h.vet} onPress={() => askVet(v.name)}>
            <View>
              <Avatar name={v.name} size={52} />
              <View style={h.online} />
            </View>
            <Text style={h.vetName} numberOfLines={1}>{v.name}</Text>
            <Text style={s.rowSub} numberOfLines={1}>{CURRENCY_FEE(v.fee)}</Text>
          </Press>
        ))}
      </ScrollView>

      <View style={s.sectionHead}>
        <Text style={h.h2}>Droppings guide</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -22 }} contentContainerStyle={{ paddingHorizontal: 22, gap: 10 }}>
        {GUIDE.map(g => (
          <View key={g.title} style={h.guide}>
            <View style={[h.swatch, { backgroundColor: g.color }]} />
            <Text style={h.guideTitle}>{g.title}</Text>
            <Text style={h.guideText}>{g.text}</Text>
            <Press onPress={openScan}><Text style={h.guideLink}>Scan yours</Text></Press>
          </View>
        ))}
      </ScrollView>
      <Text style={h.note}>This guide is general information, not a diagnosis.</Text>
    </ScrollView>
  );
}

const CURRENCY_FEE = (fee: number) => `${CURRENCY}${fee} per case`;

const h = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  circle: { width: 46, height: 46, borderRadius: 23, borderWidth: 1, borderColor: C.line, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 4, left: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: C.yellow, borderWidth: 1, borderColor: C.pine },
  hello: { fontSize: 34, fontWeight: '600', color: C.ink, letterSpacing: -1, marginTop: 10, marginBottom: 18 },
  hero: { backgroundColor: C.pine, borderRadius: 30, padding: 22 },
  heroTitle: { fontSize: 26, fontWeight: '600', color: '#fff', letterSpacing: -0.6, lineHeight: 30 },
  heroSub: { fontSize: 15, color: '#CFE3D7', lineHeight: 22, marginTop: 8 },
  heroBtn: { backgroundColor: C.yellow, borderRadius: 999, paddingVertical: 15, marginTop: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  heroBtnText: { fontSize: 16, fontWeight: '700', color: C.ink },
  last: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 },
  lastDot: { width: 8, height: 8, borderRadius: 4 },
  lastText: { fontSize: 13, color: '#CFE3D7' },
  h2: { fontSize: 22, fontWeight: '600', color: C.ink, letterSpacing: -0.4 },
  vet: { width: 130, backgroundColor: C.tile, borderRadius: 24, padding: 14, alignItems: 'flex-start', gap: 4 },
  online: { position: 'absolute', right: 0, bottom: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#2E9E5B', borderWidth: 2, borderColor: C.tile },
  vetName: { fontSize: 15, fontWeight: '600', color: C.ink, marginTop: 8 },
  guide: { width: 210, backgroundColor: C.tile, borderRadius: 24, padding: 16 },
  swatch: { width: 36, height: 36, borderRadius: 18 },
  guideTitle: { fontSize: 17, fontWeight: '600', color: C.ink, marginTop: 12 },
  guideText: { fontSize: 14, color: C.sub, lineHeight: 20, marginTop: 4, marginBottom: 10 },
  guideLink: { fontSize: 14, fontWeight: '600', color: C.pine, textDecorationLine: 'underline' },
  note: { fontSize: 12, color: C.sub, marginTop: 12 },
});