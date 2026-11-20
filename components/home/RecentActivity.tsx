import { colors } from '@/constants/colors';
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
  section: { borderRadius: 20, backgroundColor: colors.card, overflow: 'hidden' },
  header: { minHeight: 44, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.chrome },
  title: { fontFamily: 'Inter', fontWeight: '700', fontSize: 20, lineHeight: 24, color: colors.text },
  link: { fontFamily: 'Inter', fontWeight: '600', fontSize: 12, lineHeight: 15, color: colors.accent },
  cards: { gap: 1, backgroundColor: colors.surface },
  card: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: colors.card },
  name: { flex: 1, fontFamily: 'Inter', fontWeight: '600', fontSize: 14, lineHeight: 17, color: colors.text },
  date: { fontFamily: 'Inter', fontSize: 10, lineHeight: 12 },
  volume: { fontFamily: 'Inter', fontWeight: '600', fontSize: 11, lineHeight: 13, color: colors.accent },
  pressed: { opacity: 0.7 },
});
