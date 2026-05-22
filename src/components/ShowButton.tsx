import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function ShowButton({ children, onPress }: { children: React.ReactNode; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.showButton}>
      <ThemedText style={styles.showButtonText}>{children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  showButton: { width: '100%', paddingVertical: 16, borderRadius: 16, backgroundColor: '#4F46E5', alignItems: 'center' },
  showButtonText: { color: '#FFFFFF', fontWeight: '700' },
});
