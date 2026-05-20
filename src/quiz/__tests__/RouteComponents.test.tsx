import CheatRoute from '@/app/cheat';
import QuizRoute from '@/app/quiz';
import { fireEvent, render } from '@testing-library/react-native';
import * as Router from 'expo-router';
import React from 'react';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), back: jest.fn() })),
  useLocalSearchParams: jest.fn(() => ({})),
  Link: ({ children }: any) => children,
}));

describe('Route components', () => {
  beforeEach(() => {
    (Router.useRouter as jest.Mock).mockReturnValue({ push: jest.fn(), back: jest.fn() });
    (Router.useLocalSearchParams as jest.Mock).mockReturnValue({});
  });

  test('QuizRoute renders the current question and answer buttons', () => {
    const { getByText } = render(<QuizRoute />);
    expect(getByText('True')).toBeTruthy();
    expect(getByText('False')).toBeTruthy();
    expect(getByText(/Question 1 of/)).toBeTruthy();
  });

  test('CheatRoute reveals the passed answer when Show Answer is pressed', () => {
    (Router.useLocalSearchParams as jest.Mock).mockReturnValue({ answer: 'true', questionId: 'q1' });
    const { getByText, queryByText } = render(<CheatRoute />);

    expect(getByText('Show Answer')).toBeTruthy();
    expect(queryByText('Answer: True')).toBeNull();

    fireEvent.press(getByText('Show Answer'));

    expect(getByText('Answer: True')).toBeTruthy();
  });

  test('CheatRoute converts false string answer params correctly', () => {
    (Router.useLocalSearchParams as jest.Mock).mockReturnValue({ answer: 'false', questionId: 'q2' });
    const { getByText } = render(<CheatRoute />);

    fireEvent.press(getByText('Show Answer'));

    expect(getByText('Answer: False')).toBeTruthy();
  });
});
