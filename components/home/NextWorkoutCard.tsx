import { colors } from '@/constants/colors';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';

type NextWorkoutCardProps = {
  onStart: () => void;
};

export default function NextWorkoutCard({ onStart }: NextWorkoutCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.next}>
        <View style={styles.labels}>
          <Text style={styles.eyebrow}>UP NEXT</Text>
          <Text style={styles.title}>Upper Body</Text>
          <Text style={styles.description}>{'6 exercises  ·  55 min'}</Text>
        </View>
        <Image source={require('@/assets/home/workout-ring.svg')} style={styles.ring} contentFit="contain" />
      </View>
      <View style={styles.tags}>
        {['Chest', 'Triceps', 'Lats', 'Biceps'].map(muscle => (
          <View key={muscle} style={styles.tag}>
            <Text style={styles.tagLabel}>{muscle}</Text>
          </View>
        ))}
      </View>
      <Pressable accessibilityRole="button" onPress={onStart} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonLabel}>Start Workout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: 12, paddingBottom: 16, borderRadius: 20, backgroundColor: colors.card, overflow: 'hidden' },
  next: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.chrome, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  labels: { gap: 5, flexShrink: 1 },
  eyebrow: { fontFamily: 'Inter', fontWeight: '700', fontSize: 11, lineHeight: 13, color: colors.accent },
  title: { fontFamily: 'Inter', fontWeight: '700', fontSize: 20, lineHeight: 24, color: colors.text },
  description: { fontFamily: 'Inter', fontSize: 13, lineHeight: 16 },
  ring: { width: 54, height: 54 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16 },
  tag: { paddingHorizontal: 11, paddingVertical: 7, borderRadius: 15, backgroundColor: colors.surface },
  tagLabel: { fontFamily: 'Inter', fontWeight: '600', fontSize: 11, lineHeight: 13, color: colors.text },
  button: { alignSelf: 'center', minHeight: 44, paddingHorizontal: 20, borderRadius: 25, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  buttonLabel: { fontFamily: 'Inter', fontWeight: '700', fontSize: 14, lineHeight: 17, color: colors.onAccent },
  pressed: { opacity: 0.7 },
});
