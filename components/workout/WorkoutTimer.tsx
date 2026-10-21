import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';

export default function WorkoutTimer() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const accumulated = useRef(0);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setElapsed(accumulated.current + Date.now() - startedAt.current);
    }, 250);
    return () => clearInterval(interval);
  }, [running]);

  function toggle() {
    if (running) {
      accumulated.current += Date.now() - startedAt.current;
      setElapsed(accumulated.current);
    } else {
      startedAt.current = Date.now();
    }
    setRunning(value => !value);
  }

  const seconds = Math.floor(elapsed / 1000);
  const time = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Pressable style={styles.timer} onPress={toggle} accessibilityRole="button" accessibilityLabel={`${running ? 'Pause' : 'Start'} workout timer, ${time}`}>
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
});
