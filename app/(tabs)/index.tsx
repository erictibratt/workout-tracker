import { StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <Text style={styles.text}>Hello World!</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
});