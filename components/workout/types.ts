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

