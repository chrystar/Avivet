import { Field } from '@/components/Field';
import { Header } from '@/components/Header';
import { Press } from '@/components/Press';
import { Text, TextInput } from '@/components/Text';
import { BATCH, CURRENCY, PRICES } from '@/data/config';
import { pickPhotos } from '@/lib/pickPhotos';
import { C } from '@/theme/colors';
import { s } from '@/theme/styles';
import type { NewCaseData, Urgency } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

const OPTIONS = [
  ['routine', 'Routine', 'Reply within 24 hours'],
  ['urgent', 'Urgent', 'Reply within 2 hours'],
] as const;

const SYMPTOMS = [
  'Watery', 'Bloody', 'Green', 'White / chalky', 'Foamy', 'Undigested feed',
  'Birds lethargic', 'Eating less', 'Sudden deaths', 'Respiratory sounds',
];

export function NewCaseScreen({ onBack, onSubmit, vet, photo }: { onBack: () => void; onSubmit: (d: NewCaseData) => void; vet?: string; photo?: string }) {
  const [photos, setPhotos] = useState<string[]>(photo ? [photo] : []);
  const [age, setAge] = useState('');
  const [birds, setBirds] = useState(String(BATCH.birds));
  const [deaths, setDeaths] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [urgency, setUrgency] = useState<Urgency>('routine');

  const add = async (camera: boolean) => {
    const u = await pickPhotos(camera, true);
    if (u.length) setPhotos(p => [...p, ...u].slice(0, 4));
  };

  const toggle = (x: string) => setSymptoms(p => (p.includes(x) ? p.filter(i => i !== x) : [...p, x]));

  const submit = () => {
    if (photos.length === 0) return Alert.alert('Add a photo', 'The vet needs at least one clear photo of the droppings.');
    if (!age.trim()) return Alert.alert('Bird age missing', 'Enter the age of the birds in days.');
    onSubmit({ photos, age, birds, deaths, symptoms, notes, urgency, vet });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title="New case" onBack={onBack} />
      <ScrollView contentContainerStyle={[s.page, { paddingTop: 8 }]} keyboardShouldPersistTaps="handled">
        {vet ? (
          <View style={s.banner}>
            <Ionicons name="medkit" size={18} color={C.pine} />
            <Text style={s.bannerText}>Sending to {vet}</Text>
          </View>
        ) : null}
        <Text style={s.label}>Photos of droppings</Text>
        <Text style={s.hint}>Use daylight, hold the phone about 30 cm away, and keep the droppings in focus.</Text>
        <View style={s.photoGrid}>
          {photos.map((u, i) => (
            <View key={u + i} style={s.photoBox}>
              <Image source={{ uri: u }} style={s.photoImg} />
              <Press style={s.remove} onPress={() => setPhotos(p => p.filter((_, j) => j !== i))}>
                <Ionicons name="close" size={14} color="#fff" />
              </Press>
            </View>
          ))}
          {photos.length < 4 && (
            <>
              <Press style={[s.photoBox, s.photoAdd]} onPress={() => add(true)}>
                <Ionicons name="camera-outline" size={24} color={C.pine} />
                <Text style={s.addText}>Camera</Text>
              </Press>
              <Press style={[s.photoBox, s.photoAdd]} onPress={() => add(false)}>
                <Ionicons name="images-outline" size={24} color={C.pine} />
                <Text style={s.addText}>Gallery</Text>
              </Press>
            </>
          )}
        </View>

        <View style={s.two}>
          <Field label="Age (days)" value={age} onChangeText={setAge} />
          <Field label="Birds in pen" value={birds} onChangeText={setBirds} />
          <Field label="Deaths today" value={deaths} onChangeText={setDeaths} />
        </View>

        <Text style={s.label}>What are you seeing?</Text>
        <View style={s.chips}>
          {SYMPTOMS.map(x => {
            const on = symptoms.includes(x);
            return (
              <Press key={x} onPress={() => toggle(x)} style={[s.chip, on && s.chipOn]}>
                <Text style={[s.chipText, on && { color: '#fff' }]}>{x}</Text>
              </Press>
            );
          })}
        </View>

        <Text style={s.label}>Anything else</Text>
        <TextInput
          style={[s.input, { height: 90, textAlignVertical: 'top' }]} multiline value={notes}
          onChangeText={setNotes} placeholder="Feed change, medication given, when it started"
          placeholderTextColor="#98A39C"
        />

        <Text style={s.label}>How fast do you need a reply?</Text>
        {OPTIONS.map(([k, t, d]) => (
          <Press key={k} onPress={() => setUrgency(k)} style={[s.option, urgency === k && s.optionOn]}>
            <Ionicons name={urgency === k ? 'radio-button-on' : 'radio-button-off'} size={20} color={urgency === k ? C.pine : C.sub} />
            <View style={{ flex: 1 }}>
              <Text style={s.optTitle}>{t}</Text>
              <Text style={s.rowSub}>{d}</Text>
            </View>
            <Text style={s.price}>{CURRENCY}{PRICES[k]}</Text>
          </Press>
        ))}

        <Press style={[s.primary, { marginTop: 20 }]} onPress={submit}>
          <Text style={s.primaryText}>Send to vet</Text>
        </Press>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}