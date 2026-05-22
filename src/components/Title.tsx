import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <ThemedText type="title" style={styles.title}>
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({ title: { marginBottom: 8 } });
