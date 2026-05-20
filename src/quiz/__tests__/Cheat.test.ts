import * as Q from '../quizFunctions';

describe('Cheat functions', () => {
  test('getAnswerFromParams extracts answer and questionId', () => {
    const route = { params: { answer: true, questionId: 'q1' } } as any;
    const res = Q.getAnswerFromParams(route);
    expect(res).toHaveProperty('answer');
    expect(res.answer).toBe(true);
    expect(res.questionId).toBe('q1');
  });

  test('handleShowAnswer sets revealed state via setter', () => {
    const setRevealed = jest.fn();
    Q.handleShowAnswer(setRevealed, false);
    expect(setRevealed).toHaveBeenCalledWith(true);
  });

  test('CheatScreen and navigateBack should exist', () => {
    expect(typeof Q.CheatScreen).toBe('function');
    expect(typeof Q.navigateBack).toBe('function');
  });
});
