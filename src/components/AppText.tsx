import { ThemedText } from '@/components/themed-text';
import type { ReactNode } from 'react';
import React from 'react';
import { StyleSheet } from 'react-native';

type AppTextProps = {
  children: ReactNode;
  variant?: 'title' | 'body' | 'muted' | 'question' | 'answer';
};

export default function AppText({ children, variant = 'body' }: AppTextProps) {
  return (
    <ThemedText type={variant === 'title' ? 'title' : 'default'} style={styles[variant]}>
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 8 },
  body: { textAlign: 'center', color: '#4B5563', marginBottom: 28, lineHeight: 22 },
  muted: { textAlign: 'center', color: '#6B7280', marginBottom: 24, lineHeight: 22 },
  question: { fontSize: 18, lineHeight: 26, textAlign: 'center' },
  answer: { fontSize: 24, fontWeight: '700' },
});
