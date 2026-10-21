import { Stack } from 'expo-router';
import WebAppStatus from '@/components/WebAppStatus';

export default function RootLayout() {
  return (
    <>
    <WebAppStatus />
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </>
  );
}
