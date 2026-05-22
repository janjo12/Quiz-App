import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AnswerBox({ children }: { children: React.ReactNode }) {
  return <View style={styles.answerBox}>{children}</View>;
}

const styles = StyleSheet.create({ answerBox: { width: '100%', marginTop: 24, padding: 20, borderRadius: 18, backgroundColor: '#EEF2FF', alignItems: 'center' } });
