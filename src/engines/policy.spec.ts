import { PolicyEngine } from './policy';

describe('PolicyEngine', () => {
  test('fails short passwords', () => {
    const result = PolicyEngine.evaluate('short');
    expect(result.passed).toBe(false);
    expect(result.failedRules.length).toBeGreaterThan(0);
  });

  test('passes strong length password', () => {
    const result = PolicyEngine.evaluate('long-enough-password-12');
    expect(result.passed).toBe(true);
  });
});
