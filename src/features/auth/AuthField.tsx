import { Press } from '@/components/Press';
import { Text, TextInput } from '@/components/Text';
import { C } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { StyleSheet, View } from 'react-native';

export function AuthField({ label, secure, ...p }: { label: string; secure?: boolean } & TextInputProps) {
  const [hide, setHide] = useState(!!secure);
  return (
    <View style={a.wrap}>
      <Text style={a.label}>{label}</Text>
      <View style={a.row}>
        <TextInput {...p} secureTextEntry={hide} autoCapitalize={p.autoCapitalize ?? 'none'} placeholderTextColor="#A5A5A5" style={a.input} />
        {secure ? (
          <Press onPress={() => setHide(x => !x)} hitSlop={10}>
            <Ionicons name={hide ? 'eye-off-outline' : 'eye-outline'} size={20} color={C.ink} />
          </Press>
        ) : null}
      </View>
    </View>
  );
}

const a = StyleSheet.create({
  wrap: { borderWidth: 1, borderColor: '#D9D4CB', borderRadius: 32, paddingHorizontal: 22, paddingTop: 10, paddingBottom: 12, marginTop: 12 },
  label: { fontSize: 12, color: C.sub },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  input: { flex: 1, fontSize: 17, color: C.ink, padding: 0 },
});