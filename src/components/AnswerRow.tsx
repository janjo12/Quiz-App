import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AnswerRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 12 } });
