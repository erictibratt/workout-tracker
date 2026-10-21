import { colors } from '@/constants/colors';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';
import SetRow from './SetRow';
import WorkoutIcon from './WorkoutIcon';
import type { Exercise, SelectedSet } from './types';

type ExerciseCardProps = {
  exercise: Exercise;
  onUpdateSet: (
    exerciseId: number,
    setId: number,
    field: 'weight' | 'reps',
    value: string
  ) => void;
  onToggleSet: (exerciseId: number, setId: number) => void;
  onAddSet: (exerciseId: number) => void;
  onSelectSet: (selected: SelectedSet) => void;
  onHelp: () => void;
  onRemove: () => void;
};

export default function ExerciseCard({
  exercise,
  onUpdateSet,
  onToggleSet,
  onAddSet,
  onSelectSet,
  onHelp,
  onRemove,
}: ExerciseCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Pressable onPress={onHelp} hitSlop={7} accessibilityRole="button" accessibilityLabel={`Help for ${exercise.name}`}>
          <WorkoutIcon name="help" color={colors.muted} />
        </Pressable>
        <Text style={styles.title}>{exercise.name}</Text>
        <Pressable onPress={onRemove} hitSlop={10} accessibilityRole="button" accessibilityLabel={`Remove ${exercise.name}`}>
          <WorkoutIcon name="delete" />
        </Pressable>
      </View>

      {exercise.sets.map((set, index) => (
        <SetRow
          key={set.id}
          set={set}
          number={index + 1}
          last={index === exercise.sets.length - 1}
          onToggle={() => onToggleSet(exercise.id, set.id)}
          onWeightChange={value =>
            onUpdateSet(exercise.id, set.id, 'weight', value)
          }
          onRepsChange={value =>
            onUpdateSet(exercise.id, set.id, 'reps', value)
          }
          onOptions={() =>
            onSelectSet({
              exerciseId: exercise.id,
              setId: set.id,
            })
          }
        />
      ))}

      <View style={styles.cardFooter}>
        <Pressable
          style={styles.addSet}
          onPress={() => onAddSet(exercise.id)}
          accessibilityRole="button"
          accessibilityLabel={`Add set to ${exercise.name}`}
          hitSlop={5}
        >
          <WorkoutIcon name="plus" />
          <Text style={styles.addSetText}>Add Set</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardHeader: {
    height: 50,
    backgroundColor: colors.chrome,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  title: {
    color: colors.text,
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: 8,
  },
  cardFooter: {
    paddingBottom: 10,
    alignItems: 'center',
  },
  addSet: {
    width: 132,
    height: 30,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    gap: 5,
  },
  addSetText: { color: colors.text, fontFamily: 'Inter', fontWeight: '700', fontSize: 12 },
});
