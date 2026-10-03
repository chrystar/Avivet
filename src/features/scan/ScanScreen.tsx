import { Header } from '@/components/Header';
import { Press } from '@/components/Press';
import { Text } from '@/components/Text';
import { LEVEL, RESULTS } from '@/data/scan';
import { pickPhotos } from '@/lib/pickPhotos';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, View } from 'react-native';

import type { Level } from '@/types';

export function ScanScreen({ onBack, onAskVet, onResult }: { onBack: () => void; onAskVet: (photo: string) => void; onResult: (title: string, level: Level) => void }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [res, setRes] = useState<(typeof RESULTS)[number] | null>(null);

  const run = async (camera: boolean) => {
    const u = await pickPhotos(camera, false);
    if (!u.length) return;
    setPhoto(u[0]); setRes(null);
    // Demo only: replace with a call to your analysis model
    setTimeout(() => {
      const r = RESULTS[Math.floor(Math.random() * RESULTS.length)];
      setRes(r);
      onResult(r.title, r.level);
    }, 2200);
  };
  const L = res ? LEVEL[res.level] : null;

  return (
    <View style={{ flex: 1 }}>
      <Header title="Scan droppings" onBack={onBack} />
      <ScrollView contentContainerStyle={[s.page, { paddingTop: 8 }]}>
        {photo ? <Image source={{ uri: photo }} style={s.scanImg} /> : (
          <View style={s.scanHero}>
            <Ionicons name="scan-outline" size={44} color={C.pine} />
            <Text style={s.optTitle}>Photograph fresh droppings</Text>
            <Text style={[s.hint, { textAlign: 'center', marginBottom: 0 }]}>
              Use daylight, hold the phone about 30 cm away, and keep the droppings in focus.
            </Text>
          </View>
        )}

        {photo && !res && (
          <View style={s.analysing}>
            <ActivityIndicator color={C.pine} />
            <Text style={s.rowSub}>Analysing your photo</Text>
          </View>
        )}

        {res && L && (
          <View style={s.reply}>
            <View style={[s.pill, { backgroundColor: L.bg }]}>
              <Text style={[s.pillText, { color: L.fg }]}>{L.label}</Text>
            </View>
            <Text style={s.replyVerdict}>{res.title}</Text>
            <Text style={[s.rowSub, { marginTop: 10 }]}>Confidence {res.conf}%</Text>
            <View style={s.bar}><View style={[s.barFill, { width: `${res.conf}%`, backgroundColor: L.fg }]} /></View>
            {res.causes.map(c => (
              <View key={c} style={s.bullet}>
                <Ionicons name="ellipse" size={6} color={C.sub} style={{ marginTop: 8 }} />
                <Text style={s.replyBody}>{c}</Text>
              </View>
            ))}
            <View style={s.note}>
              <Ionicons name="information-circle" size={18} color={C.amber} />
              <Text style={s.noteText}>{res.advice}</Text>
            </View>
            <Text style={[s.hint, { marginTop: 12, marginBottom: 0 }]}>
              This is a first check, not a diagnosis. A vet should confirm before you give any medication.
            </Text>
          </View>
        )}

        {res && photo && (
          <Press style={s.primary} onPress={() => onAskVet(photo)}>
            <Text style={s.primaryText}>Ask a vet about this</Text>
          </Press>
        )}
        <View style={s.two}>
          <Press style={[s.secondary, { flex: 1 }]} onPress={() => run(true)}>
            <Ionicons name="camera-outline" size={20} color={C.pine} />
            <Text style={s.secondaryText}>{photo ? 'Retake' : 'Camera'}</Text>
          </Press>
          <Press style={[s.secondary, { flex: 1 }]} onPress={() => run(false)}>
            <Ionicons name="images-outline" size={20} color={C.pine} />
            <Text style={s.secondaryText}>Gallery</Text>
          </Press>
        </View>
      </ScrollView>
    </View>
  );
}