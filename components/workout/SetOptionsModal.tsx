import { Modal, Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/AppText';

type SetOptionsModalProps = {
  visible: boolean;
  onClose: () => void;
  onRemove: () => void;
};

export default function SetOptionsModal({ visible, onClose, onRemove }: SetOptionsModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
      >
        <View style={styles.menu}>
          <Pressable style={styles.menuItem} onPress={onRemove}>
            <Text style={styles.menuText}>Remove set</Text>
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={onClose}
          >
            <Text style={styles.menuText}>Cancel</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#0008',
    justifyContent: 'center',
    padding: 32,
  },
  menu: {
    backgroundColor: '#313131',
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
  },
  menuItem: {
    padding: 20,
    alignItems: 'center',
  },
  menuText: {
    fontFamily: 'Inter',
    fontSize: 16,
  },
});
