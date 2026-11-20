import { useFonts } from 'expo-font';
import { ScrollView, StyleSheet } from 'react-native';

import Text from '@/components/AppText';
import Screen, { tabScreenEdges, tabScreenStyles } from '@/components/Screen';
import HomeHeader from '@/components/home/HomeHeader';
import { colors } from '@/constants/colors';

export default function HistoryScreen() {
  const [fontsLoaded, fontError] = useFonts({ Inter: require('@/assets/fonts/Inter.ttf') });

  return (
    <Screen style={tabScreenStyles.screen} edges={tabScreenEdges}>
      {(fontsLoaded || fontError) && (
        <ScrollView style={tabScreenStyles.body} contentContainerStyle={tabScreenStyles.content} showsVerticalScrollIndicator={false}>
          <HomeHeader eyebrow="HISTORY" title="Past workouts." />
          <Text style={styles.placeholder}>See your past workouts!</Text>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
    color: colors.text,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 20,
  },
});

