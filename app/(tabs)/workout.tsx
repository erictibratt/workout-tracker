import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Screen from '@/components/Screen';
import ExerciseCard from '@/components/workout/ExerciseCard';
import SetOptionsModal from '@/components/workout/SetOptionsModal';
import type { Exercise, SelectedSet, WorkoutSet } from '@/components/workout/types';

const initialExercises: Exercise[] = [
  {
    id: 1,
    name: 'Incline Dumbbell Curls',
    sets: [
      { id: 1, weight: '14', reps: '12', completed: true },
      { id: 2, weight: '14', reps: '12', completed: false },
      { id: 3, weight: '14', reps: '12', completed: false },
      { id: 4, weight: '14', reps: '12', completed: false },
    ],
  },
];

export default function WorkoutScreen() {
  const [exercises, setExercises] = useState(initialExercises);
  const [selectedSet, setSelectedSet] = useState<SelectedSet | null>(null);

  function updateSets(exerciseId: number, newSets: WorkoutSet[]) {
    setExercises(previous =>
      previous.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, sets: newSets }
          : exercise
      )
    );
  }

  function updateSet(
    exerciseId: number,
    setId: number,
    field: 'weight' | 'reps',
    value: string
  ) {
    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    const cleaned = value.replace(
      field === 'weight' ? /[^0-9.,]/g : /[^0-9]/g,
      ''
    );

    const newSets = exercise.sets.map(set =>
      set.id === setId ? { ...set, [field]: cleaned } : set
    );

    updateSets(exerciseId, newSets);
  }

  function toggleSet(exerciseId: number, setId: number) {
    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    const newSets = exercise.sets.map(set =>
      set.id === setId
        ? { ...set, completed: !set.completed }
        : set
    );

    updateSets(exerciseId, newSets);
  }

  function addSet(exerciseId: number) {
    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    const lastSet = exercise.sets[exercise.sets.length - 1];

    const newSet: WorkoutSet = {
      id: Math.max(0, ...exercise.sets.map(set => set.id)) + 1,
      weight: lastSet?.weight ?? '14',
      reps: lastSet?.reps ?? '12',
      completed: false,
    };

    updateSets(exerciseId, [...exercise.sets, newSet]);
  }

  function removeSet() {
    if (!selectedSet) return;

    const exercise = exercises.find(
      e => e.id === selectedSet.exerciseId
    );

    if (!exercise) return;

    const newSets = exercise.sets.filter(
      set => set.id !== selectedSet.setId
    );

    updateSets(exercise.id, newSets);
    setSelectedSet(null);
  }

  return (
    <Screen style={styles.screen} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.cards}
        keyboardShouldPersistTaps="handled"
      >
        {exercises.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onUpdateSet={updateSet}
            onToggleSet={toggleSet}
            onAddSet={addSet}
            onSelectSet={setSelectedSet}
          />
        ))}
      </ScrollView>

      <SetOptionsModal
        visible={selectedSet !== null}
        onClose={() => setSelectedSet(null)}
        onRemove={removeSet}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#2d2d2d',
  },
  body: {
    flex: 1,
    backgroundColor: '#39393a',
  },
  cards: {
    padding: 15,
    paddingBottom: 58,
    width: '100%',
    maxWidth: 432,
    alignSelf: 'center',
  },
});
