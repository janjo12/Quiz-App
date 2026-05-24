import AnswerBox from '@/components/AnswerBox';
import AnswerText from '@/components/AnswerText';
import BackButton from '@/components/BackButton';
import Background from '@/components/Background';
import Container from '@/components/Container';
import ShowButton from '@/components/ShowButton';
import Subtitle from '@/components/Subtitle';
import Title from '@/components/Title';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';

// inlined helpers (moved from src/quiz/helpers.ts)
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

export function handleShowAnswer(setRevealed: (value: boolean) => void, answer: boolean): void {
  setRevealed(true);
}

export function recordCheatEvent(questionId: string | number | undefined): void {
  console.log('Cheat viewed for question:', questionId);
}

export function CheatScreen(): null {
  return null;
}

export function navigateBack(router: { back: () => void }): void {
  router.back();
}
//#endregion IMPORTS

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

  const { answer, questionId } = getAnswerFromParams({ params });

  const index = parseIndexParam(params.index);

  const [revealed, setRevealed] = useState(false);

  function handleShow() {
    handleShowAnswer(setRevealed, answer);
    recordCheatEvent(questionId);
  }

  return (
    <Background>
      <Container>
        <Title>Cheat Screen</Title>
        <Subtitle>Tap the button below to reveal the correct answer for the current question.</Subtitle>

        <ShowButton onPress={handleShow}>Show Answer</ShowButton>

        {revealed && (
          <AnswerBox>
            <AnswerText>Answer: {answer ? 'True' : 'False'}</AnswerText>
          </AnswerBox>
        )}

        <BackButton onPress={() => router.replace(`/quiz?index=${index}`)}>Back to Quiz</BackButton>
      </Container>
    </Background>
  );
}


