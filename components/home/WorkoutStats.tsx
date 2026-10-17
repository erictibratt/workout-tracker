import { StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';

const stats = [
  { label: 'WORKOUTS', value: '3' },
  { label: 'MINUTES', value: '142' },
  { label: 'VOLUME', value: '34.2k' },
];

export default function WorkoutStats() {
  return (
    <View style={styles.row}>
      {stats.map(stat => (
        <View key={stat.label} style={styles.card}>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10 },
  card: { flex: 1, gap: 4, paddingVertical: 14, paddingLeft: 14, paddingRight: 10, borderWidth: 1, borderColor: '#313131', borderRadius: 16, backgroundColor: '#313131' },
  value: { fontFamily: 'Inter', fontWeight: '700', fontSize: 19, lineHeight: 23, color: '#f6f8fb' },
  label: { fontFamily: 'Inter', fontWeight: '700', fontSize: 9, lineHeight: 11 },
});
