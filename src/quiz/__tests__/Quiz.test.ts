import * as Q from '@/app/quiz';

describe('Quiz functions', () => {
  test('getQuestionBank returns an array of question objects', () => {
    const bank = Q.getQuestionBank();
    expect(Array.isArray(bank)).toBe(true);
    expect(bank.length).toBeGreaterThan(0);
    const q = bank[0];
    expect(q).toHaveProperty('id');
    expect(q).toHaveProperty('text');
    expect(typeof q.answer).toBe('boolean');
  });

  test('cycleIndex wraps forward and backward correctly', () => {
    expect(Q.cycleIndex(2, 1, 4)).toBe(3);
    expect(Q.cycleIndex(3, 1, 4)).toBe(0);
    expect(Q.cycleIndex(0, -1, 4)).toBe(3);
  });
});
