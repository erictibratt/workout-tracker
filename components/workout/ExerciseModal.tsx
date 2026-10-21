import { colors } from '@/constants/colors';
import { Modal, Pressable, ScrollView, StyleSheet } from 'react-native';

import Text from '@/components/AppText';

export const exerciseOptions = [
  { name: 'Incline Dumbbell Curls', description: 'Sit back on an incline bench with a dumbbell in each hand. Keep your upper arms still as you curl the weights, then lower them with control.' },
  { name: 'Dumbbell Curls', description: 'Stand with a dumbbell in each hand and palms facing forward. Keep your elbows close to your sides, curl the weights, then lower them with control.' },
  { name: 'Concentration Curls', description: 'Sit with your elbow resting against your inner thigh. Curl the dumbbell toward your shoulder, then lower it with control. Repeat on each side.' },
];

type Props = {
  visible: boolean;
  exerciseName: string | null;
  onClose: () => void;
  onSelect: (name: string) => void;
};

export default function ExerciseModal({ visible, exerciseName, onClose, onSelect }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close dialog">
        <Pressable style={styles.dialog} onPress={event => event.stopPropagation()} accessibilityViewIsModal>
          <Text style={styles.title}>{exerciseName ?? 'Add New Exercise'}</Text>
          <ScrollView>
            {exerciseName ? (
              <Text style={styles.description}>{exerciseOptions.find(exercise => exercise.name === exerciseName)?.description}</Text>
            ) : exerciseOptions.map(exercise => (
              <Pressable key={exercise.name} style={styles.option} onPress={() => onSelect(exercise.name)} accessibilityRole="button">
                <Text style={styles.optionText}>{exercise.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable style={styles.close} onPress={onClose} accessibilityRole="button"><Text style={styles.closeText}>Close</Text></Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: colors.overlay, padding: 24, alignItems: 'center', justifyContent: 'center' },
  dialog: { backgroundColor: colors.card, borderRadius: 20, padding: 20, width: '100%', maxWidth: 372, maxHeight: '80%', gap: 16 },
  title: { fontFamily: 'Inter', fontSize: 20, fontWeight: '700' },
  description: { fontFamily: 'Inter', fontSize: 15, lineHeight: 23 },
  option: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.muted },
  optionText: { fontFamily: 'Inter', fontSize: 16 },
  close: { alignSelf: 'center', padding: 10 },
  closeText: { fontFamily: 'Inter', fontSize: 14, fontWeight: '700', color: colors.accent },
});
