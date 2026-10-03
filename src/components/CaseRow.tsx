import { Press } from '@/components/Press';
import { StatusPill } from '@/components/StatusPill';
import { Text } from '@/components/Text';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import type { CaseItem } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image, View } from 'react-native';

export function CaseRow({ item, onPress }: { item: CaseItem; onPress: () => void }) {
  return (
    <Press style={s.row} onPress={onPress}>
      <View style={s.thumb}>
        {item.photos[0]
          ? <Image source={{ uri: item.photos[0] }} style={s.thumbImg} />
          : <Ionicons name="image-outline" size={22} color={C.sub} />}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.rowTitle}>{item.title}</Text>
        <Text style={s.rowSub}>{item.sent} · {item.urgency === 'urgent' ? 'Urgent' : 'Routine'}</Text>
        <View style={{ marginTop: 8, alignSelf: 'flex-start' }}><StatusPill status={item.status} /></View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={C.sub} />
    </Press>
  );
}