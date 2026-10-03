import { Header } from '@/components/Header';
import { Line } from '@/components/Line';
import { StatusPill } from '@/components/StatusPill';
import { Text } from '@/components/Text';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import type { CaseItem } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, View } from 'react-native';

export function CaseDetailScreen({ item, onBack }: { item: CaseItem; onBack: () => void }) {
  const r = item.reply;
  return (
    <View style={{ flex: 1 }}>
      <Header title={item.title} onBack={onBack} />
      <ScrollView contentContainerStyle={[s.page, { paddingTop: 8 }]}>
        <StatusPill status={item.status} />

        {r ? (
          <View style={s.reply}>
            <Text style={s.replyVet}>{r.vet}</Text>
            <Text style={s.replyVerdict}>{r.verdict}</Text>
            <Text style={s.replyBody}>{r.body}</Text>
            <View style={s.note}>
              <Ionicons name="alert-circle" size={18} color={C.amber} />
              <Text style={s.noteText}>{r.note}</Text>
            </View>
          </View>
        ) : (
          <View style={s.waiting}>
            <Text style={s.optTitle}>A vet is reviewing your photos</Text>
            <Text style={[s.rowSub, { marginTop: 4 }]}>
              {item.urgency === 'urgent' ? 'Expect a reply within 2 hours.' : 'Expect a reply within 24 hours.'} We will show it here.
            </Text>
          </View>
        )}

        {item.photos.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
            {item.photos.map((u, i) => <Image key={i} source={{ uri: u }} style={s.detailImg} />)}
          </ScrollView>
        )}

        <Text style={[s.h2, { marginTop: 24 }]}>What you reported</Text>
        <View style={s.card}>
          <Line k="Bird age" v={item.age + ' days'} />
          <Line k="Birds in pen" v={item.birds || '-'} />
          <Line k="Deaths today" v={item.deaths || '0'} />
          <Line k="Signs" v={item.symptoms.length ? item.symptoms.join(', ') : 'None selected'} />
          {item.notes ? <Line k="Notes" v={item.notes} last /> : null}
        </View>
      </ScrollView>
    </View>
  );
}