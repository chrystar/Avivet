import { Press } from '@/components/Press';
import { Text } from '@/components/Text';
import { APP_NAME } from '@/data/config';
import { AuthField } from '@/features/auth/AuthField';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

export function LoginScreen({ onLogin, goRegister }: { onLogin: (name: string) => void; goRegister: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = () => {
    if (!email.includes('@') || !password) return Alert.alert('Check your details', 'Enter your email and password.');
    // Demo only: replace with a real sign-in call
    onLogin(email.split('@')[0]);
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={a.page} keyboardShouldPersistTaps="handled">
        <Text style={a.title}>Welcome back{'\n'}to {APP_NAME}</Text>
        <AuthField label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="you@example.com" />
        <AuthField label="Password" value={password} onChangeText={setPassword} secure placeholder="Your password" />
        <Press style={a.forgot}><Text style={a.small}>Forgot password?</Text></Press>
        <Press style={[s.primary, { marginTop: 20 }]} onPress={submit}>
          <Text style={s.primaryText}>Log in</Text>
        </Press>
        <View style={a.foot}>
          <Text style={a.small}>New to {APP_NAME}? </Text>
          <Press onPress={goRegister}><Text style={a.link}>Sign up</Text></Press>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const a = StyleSheet.create({
  page: { flexGrow: 1, padding: 24, paddingTop: 48 },
  title: { fontSize: 38, fontWeight: '600', color: C.ink, letterSpacing: -1.2, lineHeight: 42, marginBottom: 20 },
  forgot: { alignSelf: 'flex-end', marginTop: 14, marginBottom: 6 },
  small: { fontSize: 14, color: C.sub },
  foot: { marginTop: 'auto', paddingTop: 28, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  link: { fontSize: 14, color: C.ink, textDecorationLine: 'underline' },
  terms: { fontSize: 12, color: C.sub, textAlign: 'center', marginTop: 14, lineHeight: 18 },
});