import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getAnswerFromParams, handleShowAnswer, recordCheatEvent } from '@/quiz/quizFunctions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function CheatRoute() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { answer, questionId } = getAnswerFromParams({ params });
  const [revealed, setRevealed] = useState(false);

  function handleShow() {
    handleShowAnswer(setRevealed, answer);
    recordCheatEvent(questionId);
  }

  return (
    <ThemedView style={styles.background}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Cheat Screen
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Tap the button below to reveal the correct answer for the current question.
        </ThemedText>

        <TouchableOpacity onPress={handleShow} style={styles.showButton}>
          <ThemedText style={styles.showButtonText}>Show Answer</ThemedText>
        </TouchableOpacity>

        {revealed && (
          <ThemedView style={styles.answerBox}>
            <ThemedText style={styles.answerText}>Answer: {answer ? 'True' : 'False'}</ThemedText>
          </ThemedView>
        )}

        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backButtonText}>Back to Quiz</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EFF3FF',
    paddingTop: 24,
  },
  container: {
    flex: 1,
    margin: 18,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 6,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 22,
  },
  showButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
  },
  showButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  answerBox: {
    width: '100%',
    marginTop: 24,
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
  },
  answerLabel: {
    marginBottom: 8,
    color: '#4B5563',
  },
  answerText: {
    fontSize: 24,
    fontWeight: '700',
  },
  backButton: {
    marginTop: 28,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  backButtonText: {
    fontWeight: '700',
  },
});
