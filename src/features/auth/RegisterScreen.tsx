import { Press } from '@/components/Press';
import { Text } from '@/components/Text';
import { APP_NAME } from '@/data/config';
import { AuthField } from '@/features/auth/AuthField';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

export function RegisterScreen({ onRegister, goLogin }: { onRegister: (name: string) => void; goLogin: () => void }) {
  const [name, setName] = useState('');
  const [farm, setFarm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = () => {
    if (!name.trim() || !email.includes('@') || password.length < 6)
      return Alert.alert('Check your details', 'Enter your name, a valid email and a password of at least 6 characters.');
    // Demo only: replace with a real sign-up call
    onRegister(name.trim().split(' ')[0]);
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={a.page} keyboardShouldPersistTaps="handled">
        <Text style={a.title}>Create your{'\n'}{APP_NAME} account</Text>
        <AuthField label="Full name" value={name} onChangeText={setName} autoCapitalize="words" placeholder="Your name" />
        <AuthField label="Farm name" value={farm} onChangeText={setFarm} autoCapitalize="words" placeholder="Optional" />
        <AuthField label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="you@example.com" />
        <AuthField label="Password" value={password} onChangeText={setPassword} secure placeholder="At least 6 characters" />
        <Press style={[s.primary, { marginTop: 24 }]} onPress={submit}>
          <Text style={s.primaryText}>Create account</Text>
        </Press>
        <Text style={a.terms}>By creating an account you agree to the Terms of Use and Privacy Policy.</Text>
        <View style={a.foot}>
          <Text style={a.small}>Already have an account? </Text>
          <Press onPress={goLogin}><Text style={a.link}>Log in</Text></Press>
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