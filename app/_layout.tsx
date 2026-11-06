import { Stack } from 'expo-router';
import WebAppStatus from '@/components/WebAppStatus';
import { ExerciseLibraryProvider } from '@/components/exercises/ExerciseLibrary';

export default function RootLayout() {
  return (
    <ExerciseLibraryProvider>
    <WebAppStatus />
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </ExerciseLibraryProvider>
  );
}
