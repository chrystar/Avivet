import { Text } from '@/components/Text';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import type { Status } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export function StatusPill({ status }: { status: Status }) {
  const replied = status === 'replied';
  return (
    <View style={[s.pill, { backgroundColor: replied ? C.pineSoft : C.amberSoft }]}>
      <Ionicons name={replied ? 'checkmark-circle' : 'time'} size={14} color={replied ? C.pine : C.amber} />
      <Text style={[s.pillText, { color: replied ? C.pine : C.amber }]}>
        {replied ? 'Vet replied' : 'Waiting for vet'}
      </Text>
    </View>
  );
}