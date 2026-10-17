import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';

export default function HomeHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <Text style={styles.eyebrow}>TODAY</Text>
        <Text style={styles.heading}>Make it count.</Text>
      </View>
      <Image source={require('@/assets/home/profile.svg')} style={styles.profile} contentFit="contain" accessibilityLabel="Profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { gap: 3, flexShrink: 1 },
  eyebrow: { fontFamily: 'Inter', fontWeight: '700', fontSize: 11, lineHeight: 13, color: '#9cea91' },
  heading: { fontFamily: 'Inter', fontWeight: '700', fontSize: 30, lineHeight: 36, color: '#f6f8fb' },
  profile: { width: 45, height: 45 },
});
