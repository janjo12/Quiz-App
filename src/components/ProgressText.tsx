import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ProgressText({ children }: { children: React.ReactNode }) {
  return (
    <ThemedText style={styles.progress} type="small">
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({ progress: { color: '#6B7280', marginBottom: 18 } });
