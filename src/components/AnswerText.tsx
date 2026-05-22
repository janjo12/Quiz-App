import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function AnswerText({ children }: { children: React.ReactNode }) {
  return <ThemedText style={styles.answerText}>{children}</ThemedText>;
}

const styles = StyleSheet.create({ answerText: { fontSize: 24, fontWeight: '700' } });
