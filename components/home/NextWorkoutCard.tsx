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
  card: { padding: 20, gap: 16, borderWidth: 1, borderColor: '#313131', borderRadius: 24, backgroundColor: '#313131' },
  next: { padding: 10, borderRadius: 10, backgroundColor: '#39393a', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  labels: { gap: 5, flexShrink: 1 },
  eyebrow: { fontFamily: 'Inter', fontWeight: '700', fontSize: 11, lineHeight: 13, color: '#9cea91' },
  title: { fontFamily: 'Inter', fontWeight: '700', fontSize: 25, lineHeight: 30, color: '#f6f8fb' },
  description: { fontFamily: 'Inter', fontSize: 13, lineHeight: 16 },
  ring: { width: 54, height: 54 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 11, paddingVertical: 7, borderRadius: 10 },
  tagLabel: { fontFamily: 'Inter', fontWeight: '600', fontSize: 11, lineHeight: 13, color: '#f6f8fb' },
  button: { height: 50, borderRadius: 15, backgroundColor: '#9cea91', alignItems: 'center', justifyContent: 'center' },
  buttonLabel: { fontFamily: 'Inter', fontWeight: '700', fontSize: 15, lineHeight: 18, color: '#2d2d2d' },
  pressed: { opacity: 0.7 },
});
