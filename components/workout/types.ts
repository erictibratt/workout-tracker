export type WorkoutSet = {
  id: number;
  weight: string;
  reps: string;
  completed: boolean;
};

export type Exercise = {
  id: number;
  name: string;
  sets: WorkoutSet[];
};

export type SelectedSet = {
  exerciseId: number;
  setId: number;
};

export function isExerciseList(value: unknown): value is Exercise[] {
  return Array.isArray(value) && value.every(exercise =>
    exercise !== null && typeof exercise === 'object' &&
    Number.isSafeInteger(exercise.id) && typeof exercise.name === 'string' &&
    Array.isArray(exercise.sets) && exercise.sets.every((set: unknown) =>
      set !== null && typeof set === 'object' &&
      'id' in set && Number.isSafeInteger(set.id) &&
      'weight' in set && typeof set.weight === 'string' &&
      'reps' in set && typeof set.reps === 'string' &&
      'completed' in set && typeof set.completed === 'boolean'
    )
  );
}

