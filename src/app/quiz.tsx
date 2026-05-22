//#region IMPORTS
import AnswerButton from '@/components/AnswerButton';
import AnswerRow from '@/components/AnswerRow';
import Background from '@/components/Background';
import CheatButton from '@/components/CheatButton';
import Container from '@/components/Container';
import NavButton from '@/components/NavButton';
import ProgressText from '@/components/ProgressText';
import QuestionCard from '@/components/QuestionCard';
import Title from '@/components/Title';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';

import { cycleIndex, getQuestionBank } from '@/quiz/helpers';
//#endregion IMPORTS

function parseIndexParam(value: string | number | string[] | undefined): number {
  if (Array.isArray(value)) {
    value = value[0];
  }
  const parsed = typeof value === 'string' ? Number(value) : typeof value === 'number' ? value : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0;
}

export default function QuizRoute() {

  const router = useRouter();

  const params = useLocalSearchParams();

  const bank = getQuestionBank();

  const initialIndex = parseIndexParam(params.index);

  const [index, setIndex] = useState(initialIndex);

  const [disabled, setDisabled] = useState(false);

  const current = bank[index];

  function advance() {
    setIndex((i) => cycleIndex(i, 1, bank.length));
  }

  function retreat() {
    setIndex((i) => cycleIndex(i, -1, bank.length));
  }

  function handleCorrectAnswer() {
    setDisabled(true);
    Alert.alert(
      'Correct!',
      'Great job — moving to the next question.',
      [
        {
          text: 'OK',
          onPress: () => {
            setDisabled(false);
            advance();
          },
        },
      ],
      { cancelable: false }
    );
  }

  function handleIncorrectAnswer() {
    Alert.alert('Incorrect', 'Try again on the same question.');
  }

  function handleAnswer(value: boolean) {
    if (value === current.answer) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
  }

  function handleCheat() {
    router.push(`/cheat?answer=${current.answer}&questionId=${current.id}&index=${index}`);
  }

  return (
    <Background>
      <Container>
        <Title>True/False Quiz</Title>
        <ProgressText>Question {index + 1} of {bank.length}</ProgressText>

        <QuestionCard text={current.text} />

        <AnswerRow>
          <AnswerButton label="True" onPress={() => handleAnswer(true)} disabled={disabled} variant="true" />
          <AnswerButton label="False" onPress={() => handleAnswer(false)} disabled={disabled} variant="false" />
        </AnswerRow>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18 }}>
          <NavButton label="Previous" iconName="chevron-back-circle" onPress={retreat} />
          <CheatButton onPress={handleCheat}>Cheat</CheatButton>
          <NavButton label="Next" iconName="chevron-forward-circle" onPress={advance} />
        </View>
      </Container>
    </Background>
  );
}


