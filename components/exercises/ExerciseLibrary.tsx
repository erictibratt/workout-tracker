import { createContext, useContext, type PropsWithChildren } from 'react';
import { usePersistedState } from '@/hooks/usePersistedState';

export const muscleGroups = ['Abs', 'Biceps', 'Calves', 'Chest', 'Forearms', 'Glutes', 'Hamstrings', 'Lats', 'Lower Back'] as const;
export type MuscleGroup = typeof muscleGroups[number];
export type LibraryExercise = { id: string; name: string; muscle: MuscleGroup; description: string };
const emptyLibrary: LibraryExercise[] = [];
function isLibrary(value: unknown): value is LibraryExercise[] {
  return Array.isArray(value) && value.every(item => item && typeof item === 'object' &&
    typeof item.id === 'string' && typeof item.name === 'string' && typeof item.description === 'string' &&
    muscleGroups.includes(item.muscle));
}
type Library = {
  exercises: LibraryExercise[];
  loaded: boolean;
  storageError: string | null;
  addExercise: (exercise: Omit<LibraryExercise, 'id'>) => void;
};
const LibraryContext = createContext<Library | null>(null);

export function ExerciseLibraryProvider({ children }: PropsWithChildren) {
  const { value: exercises, setValue, loaded, storageError } = usePersistedState('workout-tracker:library:v1', emptyLibrary, isLibrary);
  function addExercise(exercise: Omit<LibraryExercise, 'id'>) {
    setValue(previous => [...previous, { ...exercise, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` }]);
  }
  return <LibraryContext.Provider value={{ exercises, loaded, storageError, addExercise }}>{children}</LibraryContext.Provider>;
}

export function useExerciseLibrary() {
  const library = useContext(LibraryContext);
  if (!library) throw new Error('Exercise library provider is missing');
  return library;
}
