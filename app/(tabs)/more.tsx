import { StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <Text style={styles.text}>There is more...</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 100,
    color: "white",
  },
});