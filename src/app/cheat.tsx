//#region IMPORTS
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

import { getAnswerFromParams, handleShowAnswer, recordCheatEvent } from '@/quiz/helpers';
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


