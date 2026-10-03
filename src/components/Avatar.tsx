import { Text } from '@/components/Text';
import { s } from '@/theme/styles';
import { View } from 'react-native';

export const Avatar = ({ name, size = 48 }: { name: string; size?: number }) => (
  <View style={[s.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
    <Text style={[s.avatarText, { fontSize: size * 0.36 }]}>
      {name.replace('Dr. ', '').split(' ').map(w => w[0]).join('').slice(0, 2)}
    </Text>
  </View>
);