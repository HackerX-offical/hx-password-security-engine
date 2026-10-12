import { CharsetEngine } from './charset';

describe('CharsetEngine', () => {
  test('counts character classes', () => {
    const a = CharsetEngine.analyze('Aa1!');
    expect(a.lowercase).toBe(1);
    expect(a.uppercase).toBe(1);
    expect(a.digits).toBe(1);
    expect(a.symbols).toBe(1);
  });

  test('pool size grows with diversity', () => {
    const narrow = CharsetEngine.getPoolSize(CharsetEngine.analyze('aaaa'));
    const wide = CharsetEngine.getPoolSize(CharsetEngine.analyze('aA1!'));
    expect(wide).toBeGreaterThan(narrow);
  });
});
