import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function HomeContainer({ children }: { children: React.ReactNode }) {
  return <ThemedView style={styles.container}>{children}</ThemedView>;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#EFF3FF', justifyContent: 'center' } });
