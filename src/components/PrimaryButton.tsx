import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function PrimaryButton({ children, onPress }: { children: React.ReactNode; onPress: () => void }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <ThemedText style={styles.buttonText}>{children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#4F46E5', borderRadius: 16, paddingHorizontal: 32, paddingVertical: 16 },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
});
