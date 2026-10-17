import type { ReactNode } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

type ScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
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
