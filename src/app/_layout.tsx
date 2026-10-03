import {
  Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/outfit';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [loaded] = useFonts({ Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold, Outfit_800ExtraBold });
  if (!loaded) return null;
  return <Stack screenOptions={{ headerShown: false }} />;
}