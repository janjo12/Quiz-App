import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function DescriptionText({ children }: { children: React.ReactNode }) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({ description: { textAlign: 'center', color: '#4B5563', marginBottom: 28, lineHeight: 22 } });
