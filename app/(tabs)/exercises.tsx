import { useState } from 'react';
import { Image } from 'expo-image';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Text from '@/components/AppText';
import Screen from '@/components/Screen';
import HomeHeader from '@/components/home/HomeHeader';
import WorkoutIcon from '@/components/workout/WorkoutIcon';
import { muscleGroups, useExerciseLibrary, type MuscleGroup } from '@/components/exercises/ExerciseLibrary';
import { colors } from '@/constants/colors';

export default function ExercisesScreen() {
  const [fontsLoaded, fontError] = useFonts({ Inter: require('@/assets/fonts/Inter.ttf') });
  const { exercises, addExercise, loaded, storageError } = useExerciseLibrary();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<MuscleGroup | null>(null);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState<MuscleGroup>('Abs');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const query = search.trim().toLowerCase();
  const groups = muscleGroups.filter(group => !query || group.toLowerCase().includes(query) ||
    exercises.some(exercise => exercise.muscle === group && exercise.name.toLowerCase().includes(query)));

  function save() {
    if (!name.trim()) { setError('Enter an exercise name.'); return; }
    if (exercises.some(exercise => exercise.name.toLowerCase() === name.trim().toLowerCase())) {
      setError('An exercise with this name already exists.'); return;
    }
    addExercise({ name: name.trim(), muscle, description: description.trim() });
    setSearch('');
    setExpanded(muscle);
    setCreating(false);
  }

  return (
    <Screen style={styles.screen} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      {(fontsLoaded || fontError) && <ScrollView style={styles.body} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <HomeHeader eyebrow="EXERCISES" title="Explore exercises." />
        {storageError && <Text accessibilityRole="alert">{storageError}</Text>}
        <View style={styles.card}>
          <View style={styles.search}>
            <Image source={require('@/assets/exercises/search.png')} style={styles.searchIcon} contentFit="contain" />
            <TextInput accessibilityLabel="Search exercises" placeholder="Search..." placeholderTextColor={colors.text} value={search} onChangeText={setSearch} style={styles.searchInput} />
          </View>
          {groups.map(group => {
            const items = exercises.filter(exercise => exercise.muscle === group);
            const visible = expanded === group || (query.length > 0 && items.some(item => item.name.toLowerCase().includes(query)));
            const matching = items.filter(item => !query || group.toLowerCase().includes(query) || item.name.toLowerCase().includes(query));
            return <View key={group}>
              <Pressable style={styles.row} onPress={() => setExpanded(expanded === group ? null : group)} accessibilityRole="button" accessibilityState={{ expanded: visible }} accessibilityLabel={`${group}, ${items.length} exercises`}>
                <Text style={styles.group}>{group}</Text><Text style={styles.count}>({items.length})</Text>
              </Pressable>
              {visible && <View style={styles.exercises}>
                {matching.length === 0 ? <Text style={styles.empty}>No exercises yet. Add a custom exercise to this group.</Text> : matching.map(item => <View key={item.id} style={styles.exercise}>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  {!!item.description && <Text style={styles.description}>{item.description}</Text>}
                </View>)}
              </View>}
            </View>;
          })}
          {groups.length === 0 && <Text style={styles.noResults}>No exercises found. Try another search or add your own.</Text>}
        </View>
        <View style={styles.footer}>
          <Pressable disabled={!loaded} style={[styles.add, !loaded && styles.disabled]} onPress={() => { setName(''); setMuscle(expanded ?? 'Abs'); setDescription(''); setError(''); setCreating(true); }} accessibilityRole="button">
            <WorkoutIcon name="plus" color={colors.onAccent} /><Text style={styles.addLabel}>Add Custom Exercise</Text>
          </Pressable>
        </View>
      </ScrollView>}
      <Modal visible={creating} transparent animationType="fade" onRequestClose={() => setCreating(false)}>
        <Pressable style={styles.backdrop} onPress={() => setCreating(false)} accessibilityLabel="Close custom exercise dialog">
          <Pressable style={styles.dialog} onPress={event => event.stopPropagation()} accessibilityViewIsModal>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.form}>
              <Text style={styles.dialogTitle}>Add Custom Exercise</Text>
              <Text style={styles.fieldLabel}>Exercise name</Text>
              <TextInput accessibilityLabel="Exercise name" value={name} onChangeText={value => { setName(value); setError(''); }} maxLength={80} style={styles.field} placeholder="e.g. Cable curls" placeholderTextColor="#aaaaaa" />
              <Text style={styles.fieldLabel}>Muscle group</Text>
              <View style={styles.chips}>{muscleGroups.map(group => <Pressable key={group} style={[styles.chip, muscle === group && styles.selectedChip]} onPress={() => setMuscle(group)} accessibilityRole="radio" accessibilityState={{ checked: muscle === group }}>
                <Text style={[styles.chipLabel, muscle === group && styles.selectedLabel]}>{group}</Text>
              </Pressable>)}</View>
              <Text style={styles.fieldLabel}>Instructions (optional)</Text>
              <TextInput accessibilityLabel="Exercise instructions" value={description} onChangeText={setDescription} multiline maxLength={1000} style={[styles.field, styles.instructions]} placeholder="How to perform this exercise" placeholderTextColor="#aaaaaa" />
              {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
              <Pressable style={styles.add} onPress={save} accessibilityRole="button"><Text style={styles.addLabel}>Save Exercise</Text></Pressable>
              <Pressable style={styles.cancel} onPress={() => setCreating(false)} accessibilityRole="button"><Text style={styles.count}>Cancel</Text></Pressable>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.chrome },
  body: { flex: 1, backgroundColor: colors.background },
  content: { width: '100%', maxWidth: 432, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 27, flexGrow: 1 },
  card: { marginTop: 15, backgroundColor: colors.card, borderRadius: 20, overflow: 'hidden' },
  search: { height: 50, backgroundColor: colors.chrome, flexDirection: 'row', alignItems: 'center', gap: 30, paddingHorizontal: 10 },
  searchIcon: { width: 30, height: 30 },
  searchInput: { flex: 1, minWidth: 0, height: 50, fontFamily: 'Inter', fontSize: 20, color: colors.text, padding: 0 },
  row: { height: 50, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 25 },
  group: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: colors.text },
  count: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: colors.accent },
  footer: { flex: 1, minHeight: 80, justifyContent: 'flex-end', alignItems: 'center', paddingTop: 24 },
  add: { height: 40, paddingHorizontal: 20, borderRadius: 25, backgroundColor: colors.accent, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, alignSelf: 'center' },
  addLabel: { fontFamily: 'Inter', fontWeight: '700', fontSize: 14, color: colors.onAccent },
  disabled: { opacity: 0.5 },
  exercises: { paddingHorizontal: 25, paddingBottom: 12 },
  exercise: { paddingVertical: 12, gap: 6, borderTopWidth: 1, borderTopColor: colors.muted },
  exerciseName: { fontFamily: 'Inter', fontSize: 15, fontWeight: '600' },
  description: { fontFamily: 'Inter', fontSize: 13, lineHeight: 20, color: '#cccccc' },
  empty: { fontFamily: 'Inter', fontSize: 13, lineHeight: 20, color: '#cccccc', paddingBottom: 8 },
  noResults: { fontFamily: 'Inter', padding: 25, fontSize: 14, lineHeight: 22 },
  backdrop: { flex: 1, backgroundColor: colors.overlay, padding: 24, alignItems: 'center', justifyContent: 'center' },
  dialog: { width: '100%', maxWidth: 400, maxHeight: '85%', backgroundColor: colors.card, borderRadius: 20 },
  form: { padding: 20, gap: 14 },
  dialogTitle: { fontFamily: 'Inter', fontSize: 20, fontWeight: '700' },
  fieldLabel: { fontFamily: 'Inter', fontSize: 13, fontWeight: '600' },
  field: { fontFamily: 'Inter', color: colors.text, backgroundColor: colors.chrome, padding: 12, borderRadius: 10, fontSize: 16 },
  instructions: { minHeight: 90, textAlignVertical: 'top' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 16, backgroundColor: colors.chrome },
  selectedChip: { backgroundColor: colors.accent },
  chipLabel: { fontFamily: 'Inter', fontSize: 12 },
  selectedLabel: { color: colors.onAccent },
  error: { fontFamily: 'Inter', color: '#ff9696', fontSize: 13 },
  cancel: { padding: 8, alignSelf: 'center' },
});
