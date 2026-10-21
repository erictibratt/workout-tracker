import { colors } from '@/constants/colors';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native';

import Screen from '@/components/Screen';
import HomeHeader from '@/components/home/HomeHeader';
import NextWorkoutCard from '@/components/home/NextWorkoutCard';
import RecentActivity from '@/components/home/RecentActivity';
import WeeklyGoal from '@/components/home/WeeklyGoal';
import WorkoutStats from '@/components/home/WorkoutStats';

export default function HomeScreen() {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({ Inter: require('@/assets/fonts/Inter.ttf') });

  return (
    <Screen style={styles.screen} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      {(fontsLoaded || fontError) && (
        <ScrollView style={styles.body} contentContainerStyle={styles.content}>
          <HomeHeader />
          <NextWorkoutCard onStart={() => router.navigate('/workout')} />
          <WorkoutStats />
          <WeeklyGoal />
          <RecentActivity onViewHistory={() => router.navigate('/history')} />
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.chrome },
  body: { flex: 1, backgroundColor: colors.background },
  content: { width: '100%', maxWidth: 432, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 12, gap: 22 },
});
