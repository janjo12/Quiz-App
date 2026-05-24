import AnswerButton from '@/components/AnswerButton';
import AnswerRow from '@/components/AnswerRow';
import Background from '@/components/Background';
import CheatButton from '@/components/CheatButton';
import Container from '@/components/Container';
import NavButton from '@/components/NavButton';
import QuestionCard from '@/components/QuestionCard';
import Title from '@/components/Title';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, View } from 'react-native';

type Question = {
  id: string | number;
  text: string;
  answer: boolean;
};

const questionBank: Question[] = [
  { id: 'q1', text: 'The Pacific Ocean is larger than the Atlantic Ocean.', answer: true },
  { id: 'q2', text: 'Mount Everest is located in South America.', answer: false },
  { id: 'q3', text: 'The Nile is the longest river in the world.', answer: true },
  { id: 'q4', text: 'Antarctica is the largest desert on Earth.', answer: true },
];

let shuffledQuestionBank: Question[] | null = null;

/**
 * Return a session-persistent shuffled question bank.
 * The shuffle only happens once per app session.
 */
export function getQuestionBank(): Question[] {
  if (!shuffledQuestionBank) {
    shuffledQuestionBank = shuffleArray(questionBank);
  }

  return [...shuffledQuestionBank];
}

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Wrap the current index so question navigation loops cleanly.
 */
export function cycleIndex(currentIndex: number, delta: number, bankLength: number): number {
  if (bankLength <= 0) {
    return 0;
  }

  const nextIndex = currentIndex + delta;
  if (nextIndex >= bankLength) {
    return 0;
  }

  if (nextIndex < 0) {
    return bankLength - 1;
  }

  return nextIndex;
}

/**
 * Convert the query string index into a safe numeric value.
 */
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

  // Use the quiz index from the URL when returning from the cheat screen.
  const bank = useMemo(() => getQuestionBank(), []);
  const initialIndex = parseIndexParam(params.index);
  const [index, setIndex] = useState(initialIndex);

  const current = bank[index];

  const advance = () => setIndex((i) => cycleIndex(i, 1, bank.length));

  const retreat = () => setIndex((i) => cycleIndex(i, -1, bank.length));

  const handleAnswer = (value: boolean) => {
    if (value === current.answer) {
      // Correct answers advance only after the user dismisses the feedback.
      Alert.alert(
        'Correct!',
        'Great job - moving to the next question.',
        [
          {
            text: 'OK',
            onPress: advance,
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('Incorrect', 'Try again.');
    }
  };

  const handleCheat = () => {
    // Send enough context for the cheat screen to reveal the answer and return here.
    router.push(`/cheat?answer=${current.answer}&questionId=${current.id}&index=${index}`);
  };

  return (
    <Background>
      <Container>
        <Title>True/False Quiz</Title>

        <QuestionCard text={current.text} />

        <AnswerRow>
          <AnswerButton label="True" onPress={() => handleAnswer(true)} variant="true" />
          <AnswerButton label="False" onPress={() => handleAnswer(false)} variant="false" />
        </AnswerRow>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18 }}>
          <NavButton label="Previous" iconName="chevron-back-circle" onPress={retreat} />
          <NavButton label="Next" iconName="chevron-forward-circle" onPress={advance} />
        </View>

        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <CheatButton onPress={handleCheat}>Cheat</CheatButton>
        </View>
      </Container>
    </Background>
  );
}


