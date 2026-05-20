import { Alert } from 'react-native';

declare const module: any;
const self = module?.exports ?? {};

export type Question = {
  id: string | number;
  text: string;
  answer: boolean;
};

let currentQuestionIndex = 0;
const questionBank: Question[] = [
  { id: 'q1', text: 'The Pacific Ocean is larger than the Atlantic Ocean.', answer: true },
  { id: 'q2', text: 'Mount Everest is located in South America.', answer: false },
  { id: 'q3', text: 'The Nile is the longest river in the world.', answer: true },
  { id: 'q4', text: 'Antarctica is the largest desert on Earth.', answer: true },
];

export function getQuestionBank(): Question[] {
  return [...questionBank];
}

export function QuizScreen(): null {
  return null;
}

export function getCurrentQuestion(index: number, bank: Question[]): Question {
  const normalizedIndex = index % bank.length;
  return bank[normalizedIndex];
}

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

export function showCorrectAlert(onDismiss: () => void): void {
  Alert.alert('Correct!', 'Great job — moving to the next question.', [
    {
      text: 'OK',
      onPress: onDismiss,
    },
  ], { cancelable: false });
}

export function showIncorrectAlert(): void {
  Alert.alert('Incorrect', 'Try again on the same question.', [
    {
      text: 'Try Again',
      style: 'cancel',
    },
  ], { cancelable: true });
}

export function handleAnswer(selectedValue: boolean): void {
  const question = getCurrentQuestion(currentQuestionIndex, questionBank);
  if (question.answer === selectedValue) {
    self.showCorrectAlert(goToNextQuestion);
  } else {
    self.showIncorrectAlert();
  }
}

export function goToNextQuestion(): void {
  currentQuestionIndex = cycleIndex(currentQuestionIndex, 1, questionBank.length);
}

export function goToPrevQuestion(): void {
  currentQuestionIndex = cycleIndex(currentQuestionIndex, -1, questionBank.length);
}

export function handlePrevButtonPress(): void {
  goToPrevQuestion();
}

export function handleNextButtonPress(): void {
  goToNextQuestion();
}

export function navigateToCheatScreen(router: { push: (route: any) => void }, currentQuestion: Question): void {
  router.push({
    pathname: '/cheat',
    params: {
      answer: currentQuestion.answer,
      questionId: currentQuestion.id,
    },
  });
}

export function renderQuestionText(question: Question, index: number, total: number): string {
  return `Question ${index + 1} / ${total}: ${question.text}`;
}

export function CheatScreen(): null {
  return null;
}

export function getAnswerFromParams(route: { params?: any }): { answer: boolean; questionId?: string | number } {
  const answerParam = route?.params?.answer;
  const questionId = route?.params?.questionId;
  return {
    answer: typeof answerParam === 'boolean' ? answerParam : false,
    questionId,
  };
}

export function handleShowAnswer(setRevealed: (value: boolean) => void, answer: boolean): void {
  setRevealed(true);
}

export function navigateBack(router: { back: () => void }): void {
  router.back();
}

export function IconButton({ name, onPress }: { name: string; onPress: () => void }): null {
  return null;
}

export function TrueFalseButton(props: { label: string; value: boolean; onPress: (value: boolean) => void }): null {
  return null;
}

export function recordCheatEvent(questionId: string | number | undefined): void {
  // This should record whether the user cheated on a question.
  // In this implementation, we log it for debugging and analytics.
  console.log('Cheat viewed for question:', questionId);
}

export function disableInputWhileAlert(showing: boolean, setShowing: (value: boolean) => void): void {
  setShowing(showing);
}
