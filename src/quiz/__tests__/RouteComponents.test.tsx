import CheatRoute from '@/app/cheat';
import QuizRoute from '@/app/quiz';
import { fireEvent, render } from '@testing-library/react-native';
import * as Router from 'expo-router';
import React from 'react';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() })),
  useLocalSearchParams: jest.fn(() => ({})),
  Link: ({ children }: any) => children,
}));

import Button from '@/components/Button';

describe('Route components', () => {
  beforeEach(() => {
    (Router.useRouter as jest.Mock).mockReturnValue({ push: jest.fn(), replace: jest.fn(), back: jest.fn() });
    (Router.useLocalSearchParams as jest.Mock).mockReturnValue({});
  });

  test('QuizRoute renders the current question and answer buttons', () => {
    const { getByText } = render(<QuizRoute />);
    expect(getByText('True')).toBeTruthy();
    expect(getByText('False')).toBeTruthy();
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

  test('Button renders children and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Show Answer</Button>);
    const btn = getByText('Show Answer');
    expect(btn).toBeTruthy();
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
  });

  test('Button supports soft styling', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress} variant="soft">Cheat</Button>);
    const btn = getByText('Cheat');
    expect(btn).toBeTruthy();
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
  });

  test('Button supports outline styling', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress} variant="outline">Back</Button>);
    const btn = getByText('Back');
    expect(btn).toBeTruthy();
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
  });
});
