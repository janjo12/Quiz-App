import { ThemedView } from '@/components/themed-view';
import type { ReactNode } from 'react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ChildrenProps = { children: ReactNode };

export function Screen({ children, centered = false }: ChildrenProps & { centered?: boolean }) {
  return <ThemedView style={[styles.screen, centered && styles.centeredScreen]}>{children}</ThemedView>;
}

export function SafeContent({ children }: ChildrenProps) {
  return <SafeAreaView style={styles.safeContent}>{children}</SafeAreaView>;
}

export function Content({ children }: ChildrenProps) {
  return <ThemedView style={styles.content}>{children}</ThemedView>;
}

export function Surface({ children, variant = 'card' }: ChildrenProps & { variant?: 'card' | 'question' | 'answer' }) {
  return <ThemedView style={[styles.surface, styles[variant]]}>{children}</ThemedView>;
}

export function Row({ children, variant = 'default' }: ChildrenProps & { variant?: 'default' | 'nav' | 'center' }) {
  return <View style={[styles.row, styles[`${variant}Row`]]}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EFF3FF', paddingTop: 24 },
  centeredScreen: { justifyContent: 'center', paddingTop: 0 },
  safeContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  content: { flex: 1, marginHorizontal: 18, alignItems: 'center', paddingTop: 60, gap: 12 },
  surface: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 6,
  },
  card: { maxWidth: 560, borderRadius: 24, padding: 32, alignItems: 'center' },
  question: { borderRadius: 22, padding: 24, marginBottom: 24 },
  answer: { marginTop: 24, padding: 20, borderRadius: 18, backgroundColor: '#EEF2FF', alignItems: 'center' },
  row: { flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 12 },
  defaultRow: {},
  navRow: { gap: 10, marginTop: 18 },
  centerRow: { justifyContent: 'center', marginTop: 12 },
});
