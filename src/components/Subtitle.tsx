import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Subtitle({ children }: { children: React.ReactNode }) {
  return <ThemedText style={styles.subtitle}>{children}</ThemedText>;
}

const styles = StyleSheet.create({ subtitle: { textAlign: 'center', color: '#6B7280', marginBottom: 24, lineHeight: 22 } });
