import * as Q from '../helpers';

describe('shared helpers', () => {
  test('navigateToCheatScreen calls router.push with answer param', () => {
    const router = { push: jest.fn() } as any;
    const question = { id: '1', text: 'Sample', answer: false };
    Q.navigateToCheatScreen(router, question);
    expect(router.push).toHaveBeenCalled();
    const arg = router.push.mock.calls[0][0];
    expect(arg).toBe('/cheat?answer=false&questionId=1');
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
