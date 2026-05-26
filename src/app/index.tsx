import AppText from '@/components/AppText';
import Button from '@/components/Button';
import { SafeContent, Screen, Surface } from '@/components/Layout';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen centered>
      <SafeContent>
        <Surface>
          <AppText variant="title">Quick Study Quiz</AppText>
          <AppText>
            Practice a quick true/false quiz, get instant feedback, and review the answer on the cheat screen.
          </AppText>
          <Button onPress={() => router.push('/quiz')}>Open Quiz</Button>
        </Surface>
      </SafeContent>
    </Screen>
  );
}
