import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import Screen, { tabScreenEdges, tabScreenStyles } from '@/components/Screen';
import HomeHeader from '@/components/home/HomeHeader';
import NextWorkoutCard from '@/components/home/NextWorkoutCard';
import RecentActivity from '@/components/home/RecentActivity';
import WeeklyGoal from '@/components/home/WeeklyGoal';
import WorkoutStats from '@/components/home/WorkoutStats';

export default function HomeScreen() {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({ Inter: require('@/assets/fonts/Inter.ttf') });

  return (
    <Screen style={tabScreenStyles.screen} edges={tabScreenEdges}>
      {(fontsLoaded || fontError) && (
        <ScrollView style={tabScreenStyles.body} contentContainerStyle={tabScreenStyles.content} showsVerticalScrollIndicator={false}>
          <HomeHeader eyebrow="HOME" title="Your training." />
          <NextWorkoutCard onStart={() => router.navigate('/workout')} />
          <WorkoutStats />
          <WeeklyGoal />
          <RecentActivity onViewHistory={() => router.navigate('/history')} />
        </ScrollView>
      )}
    </Screen>
  );
}
