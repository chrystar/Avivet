import { Press } from '@/components/Press';
import { Text } from '@/components/Text';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export const Header = ({ title, onBack }: { title: string; onBack?: () => void }) => (
  <View style={s.header}>
    {onBack ? (
      <Press onPress={onBack} style={s.backBtn} hitSlop={10}>
        <Ionicons name="chevron-back" size={22} color={C.ink} />
      </Press>
    ) : null}
    <Text style={s.headerTitle}>{title}</Text>
  </View>
);