import { Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';

const activities = [
  { name: 'Lower Body', date: 'Sep 30', volume: '12,480 kg' },
  { name: 'Upper Body', date: 'Sep 28', volume: '10,920 kg' },
];

type RecentActivityProps = {
  onViewHistory: () => void;
};

export default function RecentActivity({ onViewHistory }: RecentActivityProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent activity</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="View all activity" hitSlop={12} onPress={onViewHistory}>
          <Text style={styles.link}>View all</Text>
        </Pressable>
      </View>
      <View style={styles.cards}>
        {activities.map(activity => (
          <Pressable key={activity.name} accessibilityRole="button" onPress={onViewHistory}
            accessibilityLabel={activity.name + ', ' + activity.date + ', ' + activity.volume + '. View history'}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <Text style={styles.name}>{activity.name}</Text>
            <Text style={styles.date}>{activity.date}</Text>
            <Text style={styles.volume}>{activity.volume}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 22 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontFamily: 'Inter', fontWeight: '700', fontSize: 17, lineHeight: 21, color: '#f6f8fb' },
  link: { fontFamily: 'Inter', fontWeight: '600', fontSize: 12, lineHeight: 15, color: '#9cea91' },
  cards: { flexDirection: 'row', gap: 10 },
  card: { flex: 1, gap: 5, padding: 14, borderWidth: 1, borderColor: '#313131', borderRadius: 16, backgroundColor: '#313131' },
  name: { fontFamily: 'Inter', fontWeight: '600', fontSize: 13, lineHeight: 16, color: '#f6f8fb' },
  date: { fontFamily: 'Inter', fontSize: 10, lineHeight: 12 },
  volume: { fontFamily: 'Inter', fontWeight: '600', fontSize: 11, lineHeight: 13, color: '#9cea91' },
  pressed: { opacity: 0.7 },
});
