import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { cycleIndex, getQuestionBank } from '@/quiz/quizFunctions';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function QuizRoute() {
  const router = useRouter();
  const bank = getQuestionBank();
  const [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const current = bank[index];

  function advance() {
    setIndex((i) => cycleIndex(i, 1, bank.length));
  }

  function retreat() {
    setIndex((i) => cycleIndex(i, -1, bank.length));
  }

  function handleAnswer(value: boolean) {
    if (value === current.answer) {
      setDisabled(true);
      Alert.alert('Correct!', 'Great job — moving to the next question.', [
        {
          text: 'OK',
          onPress: () => {
            setDisabled(false);
            advance();
          },
        },
      ], { cancelable: false });
    } else {
      Alert.alert('Incorrect', 'Try again on the same question.');
    }
  }

  return (
    <ThemedView style={styles.background}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          True/False Quiz
        </ThemedText>
        <ThemedText style={styles.progress} type="small">
          Question {index + 1} of {bank.length}
        </ThemedText>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.questionText}>{current.text}</ThemedText>
        </ThemedView>

        <View style={styles.answerRow}>
          <TouchableOpacity
            onPress={() => handleAnswer(true)}
            disabled={disabled}
            style={[styles.choiceButton, styles.trueButton, disabled && styles.disabledButton]}
          >
            <ThemedText style={styles.choiceLabel}>True</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAnswer(false)}
            disabled={disabled}
            style={[styles.choiceButton, styles.falseButton, disabled && styles.disabledButton]}
          >
            <ThemedText style={styles.choiceLabel}>False</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.navRow}>
          <TouchableOpacity onPress={retreat} style={styles.iconButton} accessibilityLabel="Previous question">
            <Ionicons name="chevron-back-circle" size={42} color="#4F46E5" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/cheat?answer=${current.answer}&questionId=${current.id}`)}
            style={styles.cheatButton}
          >
            <ThemedText style={styles.cheatLabel}>Cheat</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIndex((i) => cycleIndex(i, 1, bank.length))}
            style={styles.iconButton}
            accessibilityLabel="Next question"
          >
            <Ionicons name="chevron-forward-circle" size={42} color="#4F46E5" />
          </TouchableOpacity>
        </View>
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
    marginHorizontal: 18,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  progress: {
    color: '#6B7280',
    marginBottom: 18,
  },
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
  questionText: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 12,
  },
  choiceButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  trueButton: {
    backgroundColor: '#DCFCE7',
  },
  falseButton: {
    backgroundColor: '#FEE2E2',
  },
  disabledButton: {
    opacity: 0.55,
  },
  choiceLabel: {
    fontWeight: '700',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 28,
  },
  iconButton: {
    padding: 4,
  },
  cheatButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#E0E7FF',
  },
  cheatLabel: {
    fontWeight: '700',
    color: '#4338CA',
  },
});
