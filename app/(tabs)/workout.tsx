import { colors } from '@/constants/colors';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';
import Screen from '@/components/Screen';
import ExerciseCard from '@/components/workout/ExerciseCard';
import ExerciseModal from '@/components/workout/ExerciseModal';
import SetOptionsModal from '@/components/workout/SetOptionsModal';
import WorkoutIcon from '@/components/workout/WorkoutIcon';
import WorkoutTimer from '@/components/workout/WorkoutTimer';
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
  const [fontsLoaded, fontError] = useFonts({ Inter: require('@/assets/fonts/Inter.ttf') });
  const [exercises, setExercises] = useState(initialExercises);
  const [selectedSet, setSelectedSet] = useState<SelectedSet | null>(null);
  const [exerciseModal, setExerciseModal] = useState<'add' | 'help' | null>(null);
  const [helpExercise, setHelpExercise] = useState<string | null>(null);

  function addExercise(name: string) {
    setExercises(previous => [...previous, {
      id: Math.max(0, ...previous.map(exercise => exercise.id)) + 1,
      name,
      sets: [{ id: 1, weight: '14', reps: '12', completed: false }],
    }]);
    setExerciseModal(null);
  }

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

      {(fontsLoaded || fontError) && <View style={styles.content}>
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.cards}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {exercises.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onUpdateSet={updateSet}
            onToggleSet={toggleSet}
            onAddSet={addSet}
            onSelectSet={setSelectedSet}
            onHelp={() => { setHelpExercise(exercise.name); setExerciseModal('help'); }}
            onRemove={() => setExercises(previous => previous.filter(item => item.id !== exercise.id))}
          />
        ))}
        <Pressable style={styles.addExercise} onPress={() => setExerciseModal('add')} accessibilityRole="button">
          <WorkoutIcon name="plus" color={colors.onAccent} />
          <Text style={styles.addExerciseText}>Add New Exercise</Text>
        </Pressable>
        {exercises.length > 0 && <View style={styles.muscleCard}>
          <View style={styles.muscleHeader}><Text style={styles.muscleTitle}>Muscles Worked Out</Text></View>
          <View style={styles.muscleBody}>
            <Image source={require('@/assets/workout/muscle-map.png')} contentFit="contain" style={styles.muscleImage} accessibilityLabel="Front and back muscle map with biceps highlighted in green" />
          </View>
        </View>}
      </ScrollView>
      <WorkoutTimer />
      </View>}

      <ExerciseModal visible={exerciseModal !== null} exerciseName={exerciseModal === 'help' ? helpExercise : null} onClose={() => setExerciseModal(null)} onSelect={addExercise} />

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
    backgroundColor: colors.chrome,
  },
  body: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: { flex: 1, backgroundColor: colors.background },
  cards: {
    padding: 15,
    paddingBottom: 13,
    width: '100%',
    maxWidth: 432,
    alignSelf: 'center',
    gap: 20,
  },
  addExercise: { alignSelf: 'center', height: 40, paddingHorizontal: 20, borderRadius: 25, backgroundColor: colors.accent, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  addExerciseText: { color: colors.onAccent, fontFamily: 'Inter', fontSize: 14, fontWeight: '700' },
  muscleCard: { backgroundColor: colors.card, borderRadius: 20, overflow: 'hidden' },
  muscleHeader: { height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.chrome },
  muscleTitle: { color: colors.text, fontFamily: 'Inter', fontSize: 20, fontWeight: '700' },
  muscleBody: { backgroundColor: colors.card, padding: 10 },
  muscleImage: { width: '100%', aspectRatio: 1536 / 1024 },
});
