import { StyleSheet, Text } from 'react-native';

export default function HistoryScreen() {
  return (
    <Text style={styles.text}>See your past workouts!</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
});