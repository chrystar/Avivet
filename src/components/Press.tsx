import { Pressable } from 'react-native';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export const Press = ({ style, children, ...p }: Omit<PressableProps, 'style'> & { style?: StyleProp<ViewStyle> }) => (
  <Pressable {...p} style={({ pressed }) => [style, pressed && { opacity: 0.85 }]}>{children}</Pressable>
);
