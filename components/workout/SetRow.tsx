import { colors } from '@/constants/colors';
import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet, TextInput, type TextInputProps, View } from 'react-native';

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

      <SetMeasurement
        unit="kg"
        value={set.weight}
        onChangeText={onWeightChange}
        keyboardType="decimal-pad"
        maxLength={6}
        accessibilityLabel={`Set ${number} weight in kilograms`}
      />

      <SetMeasurement
        unit="reps"
        value={set.reps}
        onChangeText={onRepsChange}
        keyboardType="number-pad"
        maxLength={3}
        accessibilityLabel={`Set ${number} repetitions`}
      />

      <Pressable style={styles.more} onPress={onOptions} accessibilityRole="button" accessibilityLabel={`Options for set ${number}`}>
        <WorkoutIcon name="more" />
      </Pressable>
    </View>
  );
}

type SetMeasurementProps = Pick<TextInputProps, 'value' | 'onChangeText' | 'keyboardType' | 'maxLength' | 'accessibilityLabel'> & {
  unit: 'kg' | 'reps';
};

function SetMeasurement({ unit, value, ...inputProps }: SetMeasurementProps) {
  return (
    <View style={styles.measurement}>
      <TextInput
        {...inputProps}
        value={value}
        allowFontScaling={Platform.OS !== 'ios'}
        selectTextOnFocus
        style={[
          styles.value,
          Platform.OS === 'web' && { width: Math.max(20, (value?.length ?? 0) * 10 + 1) },
        ]}
      />
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  setRow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16.5,
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
    lineHeight: 18,
  },
  measurement: {
    flexDirection: 'row',
    alignItems: 'baseline',
    minWidth: 47,
    gap: 1,
  },
  value: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: colors.text,
    includeFontPadding: false,
    minWidth: 20,
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  unit: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 15,
    color: colors.accent,
    includeFontPadding: false,
  },
  more: {
    width: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
