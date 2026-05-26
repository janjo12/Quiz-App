import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type IconName = ComponentProps<typeof Ionicons>['name'];

type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  equalWidth?: boolean;
  fullWidth?: boolean;
  iconName?: IconName;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'soft' | 'outline' | 'success' | 'danger';
};

export default function Button({
  children,
  onPress,
  disabled = false,
  equalWidth = false,
  fullWidth = false,
  iconName,
  iconPosition = 'left',
  variant = 'primary',
}: ButtonProps) {
  const icon = iconName ? <Ionicons name={iconName} size={36} color={variant === 'soft' ? '#4338CA' : '#FFFFFF'} /> : null;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        styles[variant],
        equalWidth && styles.equalWidth,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.content}>
        {iconPosition === 'left' && icon}
        <ThemedText style={[styles.label, styles[`${variant}Label`]]}>{children}</ThemedText>
        {iconPosition === 'right' && icon}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  equalWidth: { flex: 1 },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.55 },
  primary: { backgroundColor: '#4F46E5' },
  soft: { backgroundColor: '#E0E7FF', paddingHorizontal: 18, paddingVertical: 12 },
  outline: { borderWidth: 1, borderColor: '#CBD5E1', backgroundColor: '#FFFFFF' },
  success: {
    backgroundColor: '#DCFCE7',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  danger: {
    backgroundColor: '#FEE2E2',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  label: { fontWeight: '700', fontSize: 16 },
  primaryLabel: { color: '#FFFFFF' },
  softLabel: { color: '#4338CA' },
  outlineLabel: { color: '#111827' },
  successLabel: { color: '#111827' },
  dangerLabel: { color: '#111827' },
});
