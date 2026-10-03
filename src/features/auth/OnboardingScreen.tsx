import { Press } from '@/components/Press';
import { Text } from '@/components/Text';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Swap the emoji for your own illustrations or 3D art when you have them
const SLIDES = [
  { title: 'Spot trouble in your flock early', emoji: '🐣' },
  { title: 'Get answers from a real vet', emoji: '🩺' },
  { title: 'Grow every batch with a mentor', emoji: '🌱' },
];

export function OnboardingScreen({ onDone, onLogin }: { onDone: () => void; onLogin: () => void }) {
  const [i, setI] = useState(0);
  const last = i === SLIDES.length - 1;
  return (
    <View style={{ flex: 1 }}>
      <View style={o.top}>
        <View style={o.bars}>
          {SLIDES.map((_, n) => <View key={n} style={[o.bar, n <= i && { backgroundColor: C.pine }]} />)}
        </View>
        <Press onPress={onLogin} style={o.skip}><Text style={o.skipText}>Log in</Text></Press>
        <Text style={o.title}>{SLIDES[i].title}</Text>
      </View>
      <View style={o.stage}>
        <View style={o.hill} />
        <Text style={o.emoji}>{SLIDES[i].emoji}</Text>
      </View>
      <View style={o.footer}>
        <Press style={s.primary} onPress={() => (last ? onDone() : setI(i + 1))}>
          <Text style={s.primaryText}>{last ? 'Get started' : 'Next'}</Text>
        </Press>
      </View>
    </View>
  );
}

const o = StyleSheet.create({
  top: { paddingHorizontal: 24, paddingTop: 14 },
  bars: { flexDirection: 'row', gap: 8 },
  bar: { flex: 1, height: 3, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.22)' },
  skip: { alignSelf: 'flex-end', paddingVertical: 14 },
  skipText: { fontSize: 15, color: C.ink, fontWeight: '500' },
  title: { fontSize: 44, fontWeight: '600', color: C.ink, letterSpacing: -1.5, lineHeight: 48, marginTop: 10 },
  stage: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  hill: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '42%', backgroundColor: '#E3D2BC', borderTopLeftRadius: 240, borderTopRightRadius: 240 },
  emoji: { fontSize: 150, marginBottom: 120 },
  footer: { position: 'absolute', left: 24, right: 24, bottom: 24 },
});