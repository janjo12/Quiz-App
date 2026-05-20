import * as Q from '../quizFunctions';

describe('shared helpers', () => {
  test('navigateToCheatScreen calls router.push with answer param', () => {
    const router = { push: jest.fn() } as any;
    const question = { id: '1', answer: false };
    Q.navigateToCheatScreen(router, question);
    expect(router.push).toHaveBeenCalled();
    const arg = router.push.mock.calls[0][0];
    // Expect a pathname and params to be passed
    expect(arg).toHaveProperty('pathname');
    expect(arg).toHaveProperty('params');
    expect(arg.params.answer).toBe(false);
  });

  test('IconButton and TrueFalseButton exist and are callable', () => {
    expect(typeof Q.IconButton).toBe('function');
    expect(typeof Q.TrueFalseButton).toBe('function');
  });

  test('recordCheatEvent and disableInputWhileAlert exist', () => {
    expect(typeof Q.recordCheatEvent).toBe('function');
    expect(typeof Q.disableInputWhileAlert).toBe('function');
  });
});
