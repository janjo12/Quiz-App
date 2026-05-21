import React from 'react';
import { Text, TextProps } from 'react-native';

type ThemedTextType = 'title' | 'small' | 'label' | string;

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
};

export function ThemedText({ type, ...props }: ThemedTextProps) {
  return <Text {...props} />;
}
