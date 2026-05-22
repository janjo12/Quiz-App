import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function CheatButton({ children, onPress }: { children: React.ReactNode; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.cheatButton}>
      <ThemedText style={styles.cheatLabel}>{children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cheatButton: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 16, backgroundColor: '#E0E7FF' },
  cheatLabel: { fontWeight: '700', color: '#4338CA' },
});
