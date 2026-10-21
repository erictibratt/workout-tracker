import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';
import { colors } from '@/constants/colors';

export default function WebAppStatus() {
  const [message, setMessage] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function update() {
      const status = window.__workoutOfflineStatus;
      setMessage(!navigator.onLine ? 'Offline · Your workout is saved on this device.'
        : status === 'ready' ? 'Ready offline · In Safari, tap Share → Add to Home Screen.'
        : status === 'error' ? 'Offline setup failed. Reload while connected to the internet.'
        : status === 'loading' ? 'Preparing offline access. Keep this page open…' : null);
      setDismissed(false);
    }
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    window.addEventListener('workout-offline-status', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      window.removeEventListener('workout-offline-status', update);
    };
  }, []);

  if (!message || dismissed) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text} accessibilityLiveRegion="polite">{message}</Text>
      <Pressable onPress={() => setDismissed(true)} accessibilityRole="button" accessibilityLabel="Dismiss offline status" hitSlop={8}>
        <Text style={styles.close}>×</Text>
      </Pressable>
    </View>
  );
}

declare global {
  interface Window { __workoutOfflineStatus?: 'loading' | 'ready' | 'error'; }
}

const styles = StyleSheet.create({
  banner: { backgroundColor: colors.chrome, paddingHorizontal: 15, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 12 },
  text: { color: colors.text, flex: 1, fontSize: 12, lineHeight: 18 },
  close: { color: colors.accent, fontSize: 22 },
});
