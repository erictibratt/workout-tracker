import { colors } from '@/constants/colors';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import Text from '@/components/AppText';
import type { WorkoutSet } from './types';
import WorkoutIcon from './WorkoutIcon';

type SetRowProps = {
  set: WorkoutSet;
  number: number;
  last: boolean;
  onToggle: () => void;
  onWeightChange: (value: string) => void;
  onRepsChange: (value: string) => void;
  onOptions: () => void;
};

export default function SetRow({
  set,
  number,
  last,
  onToggle,
  onWeightChange,
  onRepsChange,
  onOptions,
}: SetRowProps) {
  return (
    <View style={[styles.setRow, last && styles.lastRow]}>
      <Pressable style={styles.count} onPress={onToggle} hitSlop={7} accessibilityRole="checkbox" aria-checked={set.completed} accessibilityState={{ checked: set.completed }} accessibilityLabel={`Set ${number} completed`}>
        <Image
          source={
            set.completed
              ? require('@/assets/workout/set-circle-active.svg')
              : require('@/assets/workout/set-circle-inactive.svg')
          }
          style={styles.circle}
          contentFit="contain"
        />

        <Text style={styles.countText}>{number}</Text>
      </Pressable>

      <View style={styles.measurement}>
        <TextInput
          value={set.weight}
          onChangeText={onWeightChange}
          keyboardType="decimal-pad"
          selectTextOnFocus
          maxLength={6}
          accessibilityLabel={`Set ${number} weight in kilograms`}
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
          accessibilityLabel={`Set ${number} repetitions`}
          style={[
            styles.input,
            { width: Math.max(20, set.reps.length * 10) },
          ]}
        />
        <Text style={styles.unit}>reps</Text>
      </View>

      <Pressable style={styles.more} onPress={onOptions} accessibilityRole="button" accessibilityLabel={`Options for set ${number}`}>
        <WorkoutIcon name="more" />
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
    paddingHorizontal: 21.5,
  },
  lastRow: { height: 60 },
  count: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  countText: {
    color: colors.text,
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 15,
  },
  measurement: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 47,
    gap: 2,
  },
  input: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    color: colors.text,
    padding: 0,
    minWidth: 20,
    maxWidth: 38,
    height: 40,
  },
  unit: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 12,
    color: colors.accent,
  },
  more: {
    width: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
