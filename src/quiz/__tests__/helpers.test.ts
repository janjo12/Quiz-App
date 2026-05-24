import { recordCheatEvent } from '@/app/cheat';
import { cycleIndex, getQuestionBank } from '@/app/quiz';

describe('shared helpers', () => {
  test('getQuestionBank returns a stable shuffle within a session', () => {
    const first = getQuestionBank();
    const second = getQuestionBank();

    expect(Array.isArray(first)).toBe(true);
    expect(first.length).toBeGreaterThan(0);
    expect(second).toEqual(first);
  });

  test('cycleIndex wraps correctly', () => {
    expect(cycleIndex(2, 1, 4)).toBe(3);
    expect(cycleIndex(3, 1, 4)).toBe(0);
    expect(cycleIndex(0, -1, 4)).toBe(3);
  });

  test('recordCheatEvent exists', () => {
    expect(typeof recordCheatEvent).toBe('function');
  });
});
