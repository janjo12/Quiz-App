import { SafeContent } from '@/components/Layout';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

describe('Layout', () => {
  test('SafeContent renders children inside SafeAreaView', () => {
    const { getByText } = render(
      <SafeContent>
        <Text>Safe content</Text>
      </SafeContent>
    );

    expect(getByText('Safe content')).toBeTruthy();
  });
});
