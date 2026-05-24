import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import RootLayout from '../_layout';
import CheatRoute from '../cheat';
import HomeScreen from '../index';

jest.mock('expo-router', () => {
  const React = require('react');
  function Stack(props: any) {
    return React.createElement('Stack', props, props.children);
  }
  Stack.Screen = (props: any) => React.createElement('StackScreen', props, props.children);
  return {
    Stack,
    useRouter: jest.fn(),
    useLocalSearchParams: jest.fn(),
  };
});

describe('App startup and navigation', () => {
  const router = { push: jest.fn(), back: jest.fn(), replace: jest.fn() };
  const useRouter = require('expo-router').useRouter as jest.Mock;
  const useLocalSearchParams = require('expo-router').useLocalSearchParams as jest.Mock;

  beforeEach(() => {
    useRouter.mockReturnValue(router);
    useLocalSearchParams.mockReturnValue({});
    router.push.mockClear();
    router.back.mockClear();
    router.replace.mockClear();
  });

  test('HomeScreen renders and opens quiz on press', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('Quick Study Quiz')).toBeTruthy();
    expect(getByText('Open Quiz')).toBeTruthy();

    fireEvent.press(getByText('Open Quiz'));
    expect(router.push).toHaveBeenCalledWith('/quiz');
  });

  test('RootLayout defines the main app stack screens', () => {
    const { toJSON } = render(<RootLayout />);
    const tree = toJSON();

    expect(tree).toBeTruthy();
    expect(tree?.type).toBe('Stack');
    const screenNames = (tree?.children || [])
      .filter((child: any) => child?.type === 'StackScreen')
      .map((child: any) => child.props?.name);

    expect(screenNames).toEqual(['index', 'quiz', 'cheat']);
  });

  test('CheatRoute uses router.replace to return to quiz', () => {
    useLocalSearchParams.mockReturnValue({ answer: 'true', questionId: 'q1', index: '2' });

    const { getByText } = render(<CheatRoute />);

    const backButton = getByText('Back to Quiz');
    expect(backButton).toBeTruthy();

    fireEvent.press(backButton);
    expect(router.replace).toHaveBeenCalledWith('/quiz?index=2');
  });

  test('CheatRoute reveals answer when Show Answer is pressed', () => {
    useLocalSearchParams.mockReturnValue({ answer: 'true', questionId: 'q1', index: '2' });

    const { getByText, queryByText } = render(<CheatRoute />);

    expect(queryByText('Answer: True')).toBeNull();
    const showButton = getByText('Show Answer');
    fireEvent.press(showButton);
    expect(getByText('Answer: True')).toBeTruthy();
  });
});
