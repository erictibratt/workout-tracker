import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import WebAppStatus from '@/components/WebAppStatus';
import { ExerciseLibraryProvider } from '@/components/exercises/ExerciseLibrary';

export default function RootLayout() {
  return (
    <ExerciseLibraryProvider>
    <StatusBar style="light" />
    <WebAppStatus />
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </ExerciseLibraryProvider>
  );
}
