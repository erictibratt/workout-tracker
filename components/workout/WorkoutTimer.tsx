import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';
import { usePersistedState } from '@/hooks/usePersistedState';

type TimerState = { accumulated: number; startedAt: number | null };
const initialTimer: TimerState = { accumulated: 0, startedAt: null };
function isTimerState(value: unknown): value is TimerState {
  if (!value || typeof value !== 'object') return false;
  return 'accumulated' in value && typeof value.accumulated === 'number' && Number.isFinite(value.accumulated) && value.accumulated >= 0 &&
    'startedAt' in value && (value.startedAt === null || (typeof value.startedAt === 'number' && Number.isFinite(value.startedAt) && value.startedAt > 0));
}

export default function WorkoutTimer() {
  const { value: timer, setValue: setTimer, loaded, storageError } = usePersistedState('workout-tracker:timer:v1', initialTimer, isTimerState);
  const [now, setNow] = useState(0);
  const running = timer.startedAt !== null;

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, [running]);

  function toggle() {
    const timestamp = Date.now();
    setNow(timestamp);
    setTimer(previous => previous.startedAt === null
      ? { ...previous, startedAt: timestamp }
      : { accumulated: previous.accumulated + Math.max(0, timestamp - previous.startedAt), startedAt: null });
  }

  const elapsed = timer.accumulated + (timer.startedAt === null ? 0 : Math.max(0, now - timer.startedAt));
  const seconds = Math.floor(elapsed / 1000);
  const time = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      {storageError && <Text accessibilityRole="alert" style={styles.error}>{storageError}</Text>}
      <Pressable disabled={!loaded} style={styles.timer} onPress={toggle} accessibilityRole="button" accessibilityLabel={`${running ? 'Pause' : 'Start'} workout timer, ${time}`}>
        {running ? (
          <View style={styles.pause}><Feather name="pause" size={20} color={colors.accent} /></View>
        ) : (
          <Image source={require('@/assets/workout/play.svg')} style={styles.play} />
        )}
        <Text style={styles.time}>{time}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, alignItems: 'center', paddingTop: 10, paddingBottom: 8 },
  timer: { minWidth: 201, height: 50, paddingHorizontal: 30, borderRadius: 20, backgroundColor: colors.card, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
  play: { width: 30, height: 30 },
  pause: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.muted, alignItems: 'center', justifyContent: 'center' },
  time: { color: colors.text, fontFamily: 'Inter', fontSize: 20, fontWeight: '700', fontVariant: ['tabular-nums'] },
  error: { color: colors.text, fontSize: 13, padding: 12 },
});
