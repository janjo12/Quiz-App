import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet } from 'react-native';

type Props = { text: string };

export default function QuestionCard({ text }: Props) {
  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.questionText}>{text}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 24,
    elevation: 6,
    marginBottom: 24,
  },
  questionText: { fontSize: 18, lineHeight: 26, textAlign: 'center' },
});
