import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native-safe-area-context';

export default function SafeAreaWrapper({ children }: { children: React.ReactNode }) {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 } });
