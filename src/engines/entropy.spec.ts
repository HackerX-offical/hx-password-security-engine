import { EntropyEngine } from './entropy';

describe('EntropyEngine', () => {
  it('returns zero entropy for empty password', () => {
    const r = EntropyEngine.calculate('');
    expect(r.bits).toBe(0);
    expect(r.strength).toBe('Very Weak');
  });

  it('scores longer mixed passwords higher than short lowercase', () => {
    const weak = EntropyEngine.calculate('abc');
    const strong = EntropyEngine.calculate('Tr0ub4dor&3_extra');
    expect(strong.bits).toBeGreaterThan(weak.bits);
  });

  it('categorizes very strong passwords', () => {
    const r = EntropyEngine.calculate('aB3!xK9$mN2@pQ7#vR4%wT6^yU8&zI0');
    expect(r.bits).toBeGreaterThanOrEqual(128);
    expect(r.strength).toBe('Very Strong');
  });
});
