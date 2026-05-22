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
        {isBack && <Ionicons name={iconName as any} size={42} color="#4F46E5" />}
        <ThemedText style={styles.navButtonLabel}>{label}</ThemedText>
        {!isBack && <Ionicons name={iconName as any} size={42} color="#4F46E5" />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  progressButton: { padding: 4 },
  navButtonContent: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  navButtonLabel: { fontWeight: '700', color: '#4F46E5', fontSize: 16 },
});
