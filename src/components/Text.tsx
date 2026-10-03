import type { TextInputProps, TextProps } from 'react-native';
import { Text as RNText, TextInput as RNTextInput, StyleSheet } from 'react-native';

const FAMILY: Record<string, string> = {
  '400': 'Outfit_400Regular', '500': 'Outfit_500Medium', '600': 'Outfit_600SemiBold',
  '700': 'Outfit_700Bold', '800': 'Outfit_800ExtraBold',
};
const font = (style: TextProps['style']) => {
  const { fontWeight, ...rest } = (StyleSheet.flatten(style) || {}) as any;
  return [rest, { fontFamily: FAMILY[String(fontWeight ?? '400')] ?? FAMILY['400'] }];
};

export const Text = (p: TextProps) => <RNText {...p} style={font(p.style)} />;
export const TextInput = (p: TextInputProps) => <RNTextInput {...p} style={font(p.style)} />;