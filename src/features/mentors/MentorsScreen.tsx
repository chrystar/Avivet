import { Avatar } from '@/components/Avatar';
import { Press } from '@/components/Press';
import { Text } from '@/components/Text';
import { CURRENCY } from '@/data/config';
import { VETS } from '@/data/vets';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import type { Plan, Sub, Vet } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

const INCLUDES = ['Weekly flock check-in', 'Priority replies on your cases', 'Vaccination and medication plan'];

export function MentorsScreen({ sub, onSubscribe, onCancel }: { sub: Sub; onSubscribe: (id: string, plan: Plan) => void; onCancel: () => void }) {
  const [plan, setPlan] = useState<Plan>('batch');
  const mine = sub ? VETS.find(v => v.id === sub.id) : null;
  const price = (v: Vet, p: Plan) => (p === 'batch' ? v.batchPrice : v.monthPrice);
  const confirm = (v: Vet) =>
    Alert.alert(`Subscribe to ${v.name}?`, `${CURRENCY}${price(v, plan)} for ${plan === 'batch' ? 'one batch (6 to 8 weeks)' : 'one month'}.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Subscribe', onPress: () => onSubscribe(v.id, plan) },
    ]);

  return (
    <ScrollView contentContainerStyle={s.page}>
      <Text style={s.h1}>Mentors</Text>
      {mine && sub ? (
        <View style={s.mine}>
          <Text style={s.statK}>Your mentor</Text>
          <Text style={[s.replyVerdict, { color: '#fff' }]}>{mine.name}</Text>
          <Text style={s.statK}>{sub.plan === 'batch' ? 'One batch plan' : 'Monthly plan'}</Text>
          <Press onPress={onCancel}><Text style={s.cancel}>Cancel subscription</Text></Press>
        </View>
      ) : null}

      <View style={s.seg}>
        {([['batch', 'One batch'], ['month', 'Monthly']] as const).map(([k, label]) => (
          <Press key={k} onPress={() => setPlan(k)} style={[s.segBtn, plan === k && s.segOn]}>
            <Text style={[s.segText, plan === k && { color: C.ink }]}>{label}</Text>
          </Press>
        ))}
      </View>

      <View style={s.card}>
        {INCLUDES.map((x, i) => (
          <View key={x} style={[s.bullet, { paddingVertical: 10 }, i < INCLUDES.length - 1 && { borderBottomWidth: 1, borderBottomColor: C.line }]}>
            <Ionicons name="checkmark-circle" size={18} color={C.pine} />
            <Text style={[s.optTitle, { fontSize: 15, fontWeight: '500' }]}>{x}</Text>
          </View>
        ))}
      </View>

      <Text style={[s.h2, { marginTop: 24, marginBottom: 12 }]}>Available mentors</Text>
      {VETS.filter(v => v.slots > 0).map(v => {
        const on = sub?.id === v.id;
        return (
          <View key={v.id} style={s.vetCard}>
            <View style={s.vetTop}>
              <Avatar name={v.name} />
              <View style={{ flex: 1 }}>
                <Text style={s.rowTitle}>{v.name}</Text>
                <Text style={s.rowSub}>{v.slots} {v.slots === 1 ? 'place' : 'places'} left</Text>
              </View>
              <Text style={s.price}>{CURRENCY}{price(v, plan)}</Text>
            </View>
            {on ? (
              <View style={[s.pill, { backgroundColor: C.pineSoft, marginTop: 12 }]}>
                <Text style={[s.pillText, { color: C.pine }]}>Subscribed</Text>
              </View>
            ) : (
              <Press style={[s.askBtn, { marginTop: 12, alignSelf: 'stretch', alignItems: 'center' }]} onPress={() => confirm(v)}>
                <Text style={s.askText}>Subscribe</Text>
              </Press>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}