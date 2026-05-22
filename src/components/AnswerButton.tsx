import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'true' | 'false';
};

export default function AnswerButton({ label, onPress, disabled = false, variant = 'true' }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.choiceButton, variant === 'true' ? styles.trueButton : styles.falseButton, disabled && styles.disabledButton]}
    >
      <ThemedText style={styles.choiceLabel}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  choiceButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  trueButton: { backgroundColor: '#DCFCE7' },
  falseButton: { backgroundColor: '#FEE2E2' },
  disabledButton: { opacity: 0.55 },
  choiceLabel: { fontWeight: '700' },
});
