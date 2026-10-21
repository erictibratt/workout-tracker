import { colors } from '@/constants/colors';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';

const dayMarkers = {
  completed: require('@/assets/home/day-completed.svg'),
  current: require('@/assets/home/day-current.svg'),
  upcoming: require('@/assets/home/day-upcoming.svg'),
};

const days = [
  { day: 'M', date: '28', status: 'completed' },
  { day: 'T', date: '29', status: 'completed' },
  { day: 'W', date: '30', status: 'completed' },
  { day: 'T', date: '1', status: 'current' },
  { day: 'F', date: '2', status: 'upcoming' },
  { day: 'S', date: '3', status: 'upcoming' },
  { day: 'S', date: '4', status: 'upcoming' },
] as const;

export default function WeeklyGoal() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly goal</Text>
        <Text style={styles.progress}>3 of 4</Text>
      </View>
      <View style={styles.days}>
        {days.map((day, index) => (
          <View key={index} style={styles.day} accessibilityLabel={day.day + ' ' + day.date + ', ' + day.status}>
            <Text style={styles.dayLabel}>{day.day}</Text>
            <Image source={dayMarkers[day.status]} style={styles.marker} contentFit="contain" />
            <Text style={styles.date}>{day.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 22 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontFamily: 'Inter', fontWeight: '700', fontSize: 17, lineHeight: 21, color: colors.text },
  progress: { fontFamily: 'Inter', fontWeight: '600', fontSize: 13, lineHeight: 16, color: colors.accent },
  days: { flexDirection: 'row', gap: 7 },
  day: { flex: 1, alignItems: 'center', gap: 6 },
  dayLabel: { fontFamily: 'Inter', fontWeight: '600', fontSize: 10, lineHeight: 12 },
  marker: { width: 34, height: 34 },
  date: { fontFamily: 'Inter', fontWeight: '700', fontSize: 10, lineHeight: 12 },
});
