import { Avatar } from '@/components/Avatar';
import { Line } from '@/components/Line';
import { Press } from '@/components/Press';
import { Text } from '@/components/Text';
import { BATCH } from '@/data/config';
import { VETS } from '@/data/vets';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import type { Sub } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Switch, View } from 'react-native';

export function ProfileScreen({ sub, caseCount, onSignOut }: { sub: Sub; caseCount: number; onSignOut: () => void }) {
  const [notify, setNotify] = useState(true);
  const mentor = sub ? VETS.find(v => v.id === sub.id)?.name : 'None yet';
  const rows = [
    ['Farm details', 'business-outline'], ['Payment methods', 'card-outline'],
    ['Language', 'language-outline'], ['Help and support', 'help-circle-outline'],
  ] as const;
  return (
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.profileTop}>
        <Avatar name="My Farm" size={72} />
        <Text style={s.h1}>My broiler farm</Text>
      </View>
      <View style={s.card}>
        <Line k="Active batch" v={`${BATCH.name}, day ${BATCH.day}`} />
        <Line k="Cases sent" v={String(caseCount)} />
        <Line k="Mentor" v={mentor ?? 'None yet'} last />
      </View>
      <View style={[s.card, { marginTop: 16 }]}>
        <View style={s.setRow}>
          <Ionicons name="notifications-outline" size={20} color={C.ink} />
          <Text style={[s.setText, { flex: 1 }]}>Reply notifications</Text>
          <Switch value={notify} onValueChange={setNotify} trackColor={{ true: C.pine }} />
        </View>
        {rows.map(([label, icon]) => (
          <Press key={label} style={[s.setRow, { borderTopWidth: 1, borderTopColor: C.line }]}>
            <Ionicons name={icon} size={20} color={C.ink} />
            <Text style={[s.setText, { flex: 1 }]}>{label}</Text>
            <Ionicons name="chevron-forward" size={18} color={C.sub} />
          </Press>
        ))}
      </View>
      <Press style={[s.setRow, s.signOut]} onPress={onSignOut}>
        <Ionicons name="log-out-outline" size={20} color={C.red} />
        <Text style={[s.setText, { color: C.red }]}>Sign out</Text>
      </Press>
    </ScrollView>
  );
}