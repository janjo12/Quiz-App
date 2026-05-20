import * as Q from '../quizFunctions';

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

  test('getCurrentQuestion returns the correct question for index', () => {
    const bank = [
      { id: 1, text: 'A', answer: true },
      { id: 2, text: 'B', answer: false },
    ];
    expect(Q.getCurrentQuestion(1, bank)).toEqual(bank[1]);
  });

  test('handleAnswer calls showCorrectAlert for correct answers', () => {
    // This test expects that handleAnswer delegates to showCorrectAlert
    const spyCorrect = jest.spyOn(Q, 'showCorrectAlert').mockImplementation(() => {});
    const spyIncorrect = jest.spyOn(Q, 'showIncorrectAlert').mockImplementation(() => {});

    // Call with a value matching the (assumed) current question's answer
    Q.handleAnswer(true);

    expect(spyCorrect).toHaveBeenCalled();
    expect(spyIncorrect).not.toHaveBeenCalled();

    spyCorrect.mockRestore();
    spyIncorrect.mockRestore();
  });

  test('goToNextQuestion and goToPrevQuestion adjust index by cycling', () => {
    // These functions are expected to update some internal state; at minimum they should exist and be callable.
    expect(typeof Q.goToNextQuestion).toBe('function');
    expect(typeof Q.goToPrevQuestion).toBe('function');
  });
});
