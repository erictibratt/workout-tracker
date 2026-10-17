import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import Text from '@/components/AppText';
import type { WorkoutSet } from './types';

type SetRowProps = {
  set: WorkoutSet;
  number: number;
  onToggle: () => void;
  onWeightChange: (value: string) => void;
  onRepsChange: (value: string) => void;
  onOptions: () => void;
};

export default function SetRow({
  set,
  number,
  onToggle,
  onWeightChange,
  onRepsChange,
  onOptions,
}: SetRowProps) {
  return (
    <View style={styles.setRow}>
      <Pressable style={styles.count} onPress={onToggle}>
        <Image
          source={
            set.completed
              ? require('@/assets/workout/set-circle-active.svg')
              : require('@/assets/workout/set-circle-inactive.svg')
          }
          style={styles.circle}
          contentFit="contain"
        />

        <Text
          style={[
            styles.countText,
            set.completed && styles.completedCountText,
          ]}
        >
          {number}
        </Text>
      </Pressable>

      <View style={styles.measurement}>
        <TextInput
          value={set.weight}
          onChangeText={onWeightChange}
          keyboardType="decimal-pad"
          selectTextOnFocus
          maxLength={6}
          style={[
            styles.input,
            { width: Math.max(20, set.weight.length * 10) },
          ]}
        />
        <Text style={styles.unit}>kg</Text>
      </View>

      <View style={styles.measurement}>
        <TextInput
          value={set.reps}
          onChangeText={onRepsChange}
          keyboardType="number-pad"
          selectTextOnFocus
          maxLength={3}
          style={[
            styles.input,
            { width: Math.max(20, set.reps.length * 10) },
          ]}
        />
        <Text style={styles.unit}>reps</Text>
      </View>

      <Pressable style={styles.more} onPress={onOptions}>
        <Feather name="more-vertical" size={18} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  setRow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
  },
  count: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: 28,
    height: 28,
  },
  countText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
  },
  completedCountText: {
    color: '#9cea91',
  },
  measurement: {
    flexDirection: 'row',
    alignItems: 'baseline',
    width: 47,
    gap: 2,
  },
  input: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
    padding: 0,
    minWidth: 20,
    maxWidth: 38,
    height: 40,
  },
  unit: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 12,
    color: '#9cea91',
  },
  more: {
    width: 44,
    height: 48,
    marginHorizontal: -12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
