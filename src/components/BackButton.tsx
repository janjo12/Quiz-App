import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function BackButton({ children, onPress }: { children: React.ReactNode; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.backButton}>
      <ThemedText style={styles.backButtonText}>{children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({ backButton: { marginTop: 28, paddingVertical: 14, paddingHorizontal: 28, borderRadius: 16, borderWidth: 1, borderColor: '#CBD5E1' }, backButtonText: { fontWeight: '700' } });
