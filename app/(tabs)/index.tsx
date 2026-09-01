import { StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <Text style={styles.text}>Welcome to the Home Page!"</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
});