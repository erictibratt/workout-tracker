import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';
import SetRow from './SetRow';
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
};

export default function ExerciseCard({
  exercise,
  onUpdateSet,
  onToggleSet,
  onAddSet,
  onSelectSet,
}: ExerciseCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{exercise.name}</Text>
      </View>

      {exercise.sets.map((set, index) => (
        <SetRow
          key={set.id}
          set={set}
          number={index + 1}
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
        >
          <Feather name="plus-circle" size={24} color="#8a8a8a" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#313131',
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardHeader: {
    height: 50,
    backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
  cardFooter: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  addSet: {
    width: 184,
    height: 28,
    backgroundColor: '#39393a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});
