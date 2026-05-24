import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

describe('SafeAreaWrapper', () => {
  test('renders children inside SafeAreaView', () => {
    const { getByText } = render(
      <SafeAreaWrapper>
        <Text>Safe content</Text>
      </SafeAreaWrapper>
    );

    expect(getByText('Safe content')).toBeTruthy();
  });
});
