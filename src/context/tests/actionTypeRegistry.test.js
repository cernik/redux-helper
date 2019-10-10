import actionTypes, { registerActionTypes } from '../actionTypeRegistry';

describe('action registry test suit', () => {
  test('registerActionTypes is a function', () => {
    expect(registerActionTypes).toBeInstanceOf(Function);
  });

  test('actionTypes is an object', () => {
    expect(actionTypes).toBeInstanceOf(Object);
  });

  test('registered actionTypes are available on the "actionTypes" object', () => {
    const input = { do: () => {} };
    registerActionTypes(input);
    expect(actionTypes.do).toBe(input.do);
  });
});
