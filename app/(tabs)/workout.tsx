import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutScreen() {
  return (
    <SafeAreaView>
          <Text style={styles.text}>Start your next workout!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
});