import Card from '@/components/Card';
import DescriptionText from '@/components/DescriptionText';
import HomeContainer from '@/components/HomeContainer';
import PrimaryButton from '@/components/PrimaryButton';
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import Title from '@/components/Title';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <HomeContainer>
      <SafeAreaWrapper>
        <Card>
          <Title>Quick Study Quiz</Title>
          <DescriptionText>
            Practice a quick true/false quiz, get instant feedback, and review the answer on the cheat screen.
          </DescriptionText>
          <PrimaryButton onPress={() => router.push('/quiz')}>Open Quiz</PrimaryButton>
        </Card>
      </SafeAreaWrapper>
    </HomeContainer>
  );
}


