import { CaseRow } from '@/components/CaseRow';
import { Text } from '@/components/Text';
import { s } from '@/theme/styles';
import type { CaseItem } from '@/types';
import { ScrollView } from 'react-native';

export function CasesScreen({ cases, openCase }: { cases: CaseItem[]; openCase: (id: string) => void }) {
  return (
    <ScrollView contentContainerStyle={s.page}>
      <Text style={s.h1}>Cases</Text>
      {cases.length === 0
        ? <Text style={s.empty}>Nothing here yet.</Text>
        : cases.map(c => <CaseRow key={c.id} item={c} onPress={() => openCase(c.id)} />)}
    </ScrollView>
  );
}