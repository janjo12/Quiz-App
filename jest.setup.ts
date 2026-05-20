import '@testing-library/jest-native/extend-expect';

// Silence expo/router and react-native animated native warnings in tests
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
  useSearchParams: () => ({}),
  Link: ({ children }: any) => children,
}));
