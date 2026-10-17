import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabIcons: Record<string, string> = { index: '⌂', workout: '＋', history: '◷', exercises: '≡' };

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#9cea91',
        tabBarInactiveTintColor: '#f6f8fb',
        tabBarStyle: [
          styles.tabBar,
          { height: 65 + insets.bottom, paddingBottom: 8 + insets.bottom },
        ],
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ color }) => (
          <Text style={[styles.icon, { color }]}>{tabIcons[route.name]}</Text>
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="workout" options={{ title: 'Workout' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="exercises" options={{ title: 'Exercises' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#2d2d2d',
    borderTopColor: '#313131',
    paddingTop: 10,
  },
  label: {
    fontSize: 9,
    fontWeight: '600',
  },
  icon: {
    fontSize: 18,
  },
});
