import Text from '@/components/AppText';
import { colors } from '@/constants/colors';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabIcons: Record<string, string> = { index: '⌂', workout: '＋', history: '◷', exercises: '≡' };

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      tabBar={({ state, descriptors, emitter, navigateToTab }) => (
        <View style={[styles.tabBar, { paddingBottom: insets.bottom, paddingLeft: 16 + insets.left, paddingRight: 16 + insets.right }]}>
          <View style={styles.items}>
            {state.routes.map((route, index) => {
              const selected = state.index === index;
              const { options } = descriptors[route.key];
              const color = selected ? colors.accent : colors.text;
              return (
                <Pressable
                  key={route.key}
                  accessibilityRole="tab"
                  accessibilityState={{ selected }}
                  accessibilityLabel={options.tabBarAccessibilityLabel ?? options.title ?? route.name}
                  onPress={() => {
                    const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                    if (!selected && !event.defaultPrevented) navigateToTab(route.key);
                  }}
                  onLongPress={() => emitter.emit({ type: 'tabLongPress', target: route.key })}
                  style={styles.item}
                >
                  <Text allowFontScaling={false} style={[styles.icon, { color }]}>{tabIcons[route.name]}</Text>
                  <Text style={[styles.label, { color }]}>{options.title ?? route.name}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
      screenOptions={{
        headerShown: false,
      }}
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
    backgroundColor: colors.chrome,
    borderTopColor: colors.card,
    borderTopWidth: 1,
  },
  items: { height: 64, flexDirection: 'row' },
  item: { flex: 1, paddingTop: 10, alignItems: 'center', gap: 3 },
  label: {
    fontFamily: 'Inter',
    fontSize: 9,
    lineHeight: 11,
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false,
  },
  icon: {
    fontFamily: 'Inter',
    fontSize: 18,
    lineHeight: 22,
    height: 22,
    textAlign: 'center',
    includeFontPadding: false,
  },
});
