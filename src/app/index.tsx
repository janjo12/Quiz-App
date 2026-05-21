import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.card}>
          <ThemedText type="title" style={styles.title}>
            Quick Study Quiz
          </ThemedText>
          <ThemedText style={styles.description}>
            Practicase a quick true/false quiz, get instant feedback, and review the answer on the cheat screen.
          </ThemedText>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/quiz')}>
            <ThemedText style={styles.buttonText}>Open Quiz</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF3FF',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 6,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#4B5563',
    marginBottom: 28,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
