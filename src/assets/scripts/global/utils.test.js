import { delay } from './utils';

describe('delay', () => {

  test('should resolve with true', () => {

    return delay(1).then(data => {

      expect(data).toBe(true);

    });

  });

  test('should only resolve after timeout', async () => {

    jest.useFakeTimers();

    const spy = jest.fn();
    delay(100).then(spy);

    jest.advanceTimersByTime(20);
    await Promise.resolve();
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(80);
    await Promise.resolve();
    expect(spy).toHaveBeenCalled();

    jest.useRealTimers();

  });

});
