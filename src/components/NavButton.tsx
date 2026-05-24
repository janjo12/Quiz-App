import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = { label: string; iconName: string; onPress: () => void };

export default function NavButton({ label, iconName, onPress }: Props) {
  const isBack = iconName.includes('back');
  return (
    <Pressable onPress={onPress} style={styles.progressButton} accessibilityLabel={`${label} question`}>
      <View style={styles.navButtonContent}>
        {isBack && <Ionicons name={iconName as any} size={42} color="#FFFFFF" />}
        <ThemedText style={styles.navButtonLabel}>{label}</ThemedText>
        {!isBack && <Ionicons name={iconName as any} size={42} color="#FFFFFF" />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  progressButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  navButtonContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navButtonLabel: { fontWeight: '700', color: '#FFFFFF', fontSize: 16 },
});
