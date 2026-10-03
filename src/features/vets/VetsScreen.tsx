import { Avatar } from '@/components/Avatar';
import { Press } from '@/components/Press';
import { Text } from '@/components/Text';
import { CURRENCY } from '@/data/config';
import { VETS } from '@/data/vets';
import { s } from '@/theme/styles';
import type { Vet } from '@/types';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

export function VetsScreen({ onAsk }: { onAsk: (v: Vet) => void }) {
  const [online, setOnline] = useState(false);
  const list = VETS.filter(v => !online || v.online);
  return (
    <ScrollView contentContainerStyle={s.page}>
      <Text style={s.h1}>Vets</Text>
      <View style={[s.chips, { marginBottom: 16 }]}>
        <Press onPress={() => setOnline(false)} style={[s.chip, !online && s.chipOn]}>
          <Text style={[s.chipText, !online && { color: '#fff' }]}>All vets</Text>
        </Press>
        <Press onPress={() => setOnline(true)} style={[s.chip, online && s.chipOn]}>
          <Text style={[s.chipText, online && { color: '#fff' }]}>Online now</Text>
        </Press>
      </View>
      {list.map(v => (
        <View key={v.id} style={s.vetCard}>
          <View style={s.vetTop}>
            <Avatar name={v.name} />
            <View style={{ flex: 1 }}>
              <Text style={s.rowTitle}>{v.name}</Text>
              <Text style={s.rowSub}>{v.spec}</Text>
            </View>
            <View style={[s.dot, { backgroundColor: v.online ? '#2E9E5B' : '#B8C0BA' }]} />
          </View>
          <Text style={s.about}>{v.about}</Text>
          <Text style={s.rowSub}>{v.rating} rating, {v.years} years experience</Text>
          <View style={s.vetFoot}>
            <Text style={s.price}>{CURRENCY}{v.fee} <Text style={s.rowSub}>per case</Text></Text>
            <Press style={s.askBtn} onPress={() => onAsk(v)}>
              <Text style={s.askText}>Ask this vet</Text>
            </Press>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}