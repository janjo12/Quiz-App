import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Background({ children }: { children: React.ReactNode }) {
  return <ThemedView style={styles.background}>{children}</ThemedView>;
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#EFF3FF', paddingTop: 24 },
});
