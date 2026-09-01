import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Workout</Text>
      <Text style={styles.subtitle}>Dagens pass</Text>

      <View style={styles.workoutCard}>
        <Text style={styles.exerciseName}>Bench Press</Text>

        <View style={styles.setRow}>
          <Text style={styles.setNumber}>Set 1</Text>
          <Text style={styles.setInfo}>80 kg × 8</Text>
        </View>

        <View style={styles.setRow}>
          <Text style={styles.setNumber}>Set 2</Text>
          <Text style={styles.setInfo}>80 kg × 7</Text>
        </View>

         <View style={styles.setRow}>
          <Text style={styles.setNumber}>Set 3</Text>
          <Text style={styles.setInfo}>80 kg × 7</Text>
        </View>

         <View style={styles.setRow}>
          <Text style={styles.setNumber}>Set 2</Text>
          <Text style={styles.setInfo}>80 kg × 7</Text>
        </View>

         <View style={styles.setRow}>
          <Text style={styles.setNumber}>Set 3</Text>
          <Text style={styles.setInfo}>80 kg × 7</Text>
        </View>
        
         <View style={styles.setRow}>
          <Text style={styles.setNumber}>Set 4</Text>
          <Text style={styles.setInfo}>80 kg × 7</Text>
        </View>
          
        <View style={styles.V}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>+ Lägg till set</Text>
          </TouchableOpacity>
        </View>

      </View>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Starta workout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },

  V: {
    padding: 10,
  },

  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 60,
  },

  subtitle: {
    color: '#999',
    fontSize: 18,
    marginTop: 5,
    marginBottom: 25,
  },

  workoutCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#8a8a8a",
    overflow: "hidden",
  },

  exerciseName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },

  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#292929',
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#000000",
  },

  setNumber: {
    color: '#aaa',
    fontSize: 16,
  },

  setInfo: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  startButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});