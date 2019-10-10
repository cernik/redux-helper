import { context, actions } from '..';

describe('context entry point test suit', () => {
  test('exports actions as a named export', () => {
    expect(actions).toBeInstanceOf(Object);
  });

  test('exports context as named export', () => {
    expect(context).toBeInstanceOf(Object);
  });

  test('context contains "registerActions" method', () => {
    expect(context.registerActions).toBeInstanceOf(Function);
  });
});
