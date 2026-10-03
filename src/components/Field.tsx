import { Text, TextInput } from '@/components/Text';
import { s } from '@/theme/styles';
import type { TextInputProps } from 'react-native';
import { View } from 'react-native';

export const Field = ({ label, ...p }: { label: string } & TextInputProps) => (
  <View style={{ flex: 1 }}>
    <Text style={s.label}>{label}</Text>
    <TextInput {...p} keyboardType="number-pad" style={s.input} />
  </View>
);