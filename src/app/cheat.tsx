import AppText from '@/components/AppText';
import Button from '@/components/Button';
import { Content, Screen, Surface } from '@/components/Layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';

/**
 * Read the answer payload from route params.
 * Expo Router query params arrive as strings on normal navigation, but tests
 * may pass booleans directly, so both forms are accepted here.
 */
export function getAnswerFromParams(route: { params?: any }): { answer: boolean; questionId?: string | number } {
  const answerParam = route?.params?.answer;
  const questionId = route?.params?.questionId;
  const answer =
    typeof answerParam === 'boolean'
      ? answerParam
      : answerParam === 'true' || answerParam === true;
  return {
    answer,
    questionId,
  };
}

/**
 * Convert the quiz index query param into a safe zero-based index.
 * Missing, negative, or non-numeric values fall back to the first question.
 */
function parseIndexParam(value: string | number | string[] | undefined): number {
  if (Array.isArray(value)) {
    value = value[0];
  }
  const parsed = typeof value === 'string' ? Number(value) : typeof value === 'number' ? value : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0;
}

export default function CheatRoute() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Pull the current answer and quiz position from the URL created by quiz.tsx.
  const { answer, questionId } = getAnswerFromParams({ params });
  const index = parseIndexParam(params.index);

  // Keep the answer hidden until the user explicitly asks to see it.
  const [revealed, setRevealed] = useState(false);

  /** Reveal the answer and leave a simple trace for the question that was viewed. */
  function handleShow() {
    setRevealed(true);
    console.log('Cheat viewed for question:', questionId);
  }

  return (
    <Screen>
      <Content>
        <AppText variant="title">Cheat Screen</AppText>
        <AppText variant="muted">Tap the button below to reveal the correct answer for the current question.</AppText>

        <Button fullWidth onPress={handleShow}>Show Answer</Button>

        {revealed && (
          <Surface variant="answer">
            <AppText variant="answer">Answer: {answer ? 'True' : 'False'}</AppText>
          </Surface>
        )}

        {/* Replace keeps the back stack focused on the quiz flow instead of piling up cheat screens. */}
        <Button onPress={() => router.replace(`/quiz?index=${index}`)} variant="outline">Back to Quiz</Button>
      </Content>
    </Screen>
  );
}
