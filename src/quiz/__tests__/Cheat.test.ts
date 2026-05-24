import * as Q from '@/app/cheat';

describe('Cheat functions', () => {
  test('getAnswerFromParams extracts answer and questionId', () => {
    const route = { params: { answer: true, questionId: 'q1' } } as any;
    const res = Q.getAnswerFromParams(route);
    expect(res).toHaveProperty('answer');
    expect(res.answer).toBe(true);
    expect(res.questionId).toBe('q1');
  });

  test('getAnswerFromParams converts string booleans correctly', () => {
    const route = { params: { answer: 'true', questionId: 'q1' } } as any;
    const res = Q.getAnswerFromParams(route);
    expect(res.answer).toBe(true);
    expect(res.questionId).toBe('q1');
  });

  test('getAnswerFromParams converts false string booleans correctly', () => {
    const route = { params: { answer: 'false', questionId: 'q2' } } as any;
    const res = Q.getAnswerFromParams(route);
    expect(res.answer).toBe(false);
    expect(res.questionId).toBe('q2');
  });

  test('does not export unused route placeholder helpers', () => {
    expect(Q).not.toHaveProperty('CheatScreen');
    expect(Q).not.toHaveProperty('navigateBack');
  });
});
