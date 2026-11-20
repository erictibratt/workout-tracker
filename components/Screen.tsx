import type { ReactNode } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edges } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';

type ScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edges;
};

export default function Screen({ children, style, edges }: ScreenProps) {
  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
  },
});

export const tabScreenEdges = { top: 'maximum', left: 'additive', right: 'additive' } as const;

export const tabScreenStyles = StyleSheet.create({
  screen: { backgroundColor: colors.chrome, paddingTop: 65 },
  body: { flex: 1, backgroundColor: colors.background },
  content: {
    width: '100%',
    maxWidth: 402,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    gap: 20,
  },
});
