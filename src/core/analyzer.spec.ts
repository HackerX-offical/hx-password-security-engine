import { PasswordAnalyzer } from './analyzer';

describe('PasswordAnalyzer', () => {
  test('orchestrates entropy, crack time, and policy', () => {
    const result = PasswordAnalyzer.analyze('Correct-Horse-Battery-Staple!');
    expect(result.entropy.bits).toBeGreaterThan(50);
    expect(result.crackTimes.length).toBeGreaterThan(0);
    expect(result.policy).toBeDefined();
  });
});
