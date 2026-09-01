import { Text, StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  return (
    <Text style={styles.text}>This is the second tab!</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 100,
    color: "white",
  },
});