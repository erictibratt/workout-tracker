import { Image } from 'expo-image';
import { View } from 'react-native';

const icons = {
  help: { source: require('@/assets/workout/help.svg'), size: 30, width: 27.5, height: 27.5 },
  delete: { source: require('@/assets/workout/delete.svg'), size: 25, width: 16.6667, height: 18.75 },
  more: { source: require('@/assets/workout/more.svg'), size: 25, width: 3.58333, height: 18.1667 },
  plus: { source: require('@/assets/workout/plus.svg'), size: 20, width: 13.6667, height: 13.6667 },
};

export default function WorkoutIcon({ name, color }: { name: keyof typeof icons; color?: string }) {
  const { source, size, width, height } = icons[name];

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={source} style={{ width, height }} contentFit="contain" tintColor={color} />
    </View>
  );
}
