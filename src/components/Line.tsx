import { Text } from '@/components/Text';
import { s } from '@/theme/styles';
import { View } from 'react-native';

export const Line = ({ k, v, last }: { k: string; v: string; last?: boolean }) => (
  <View style={[s.line, last && { borderBottomWidth: 0 }]}>
    <Text style={s.lineK}>{k}</Text>
    <Text style={s.lineV}>{v}</Text>
  </View>
);