import { CrackTimeEstimator } from './crack-time';

describe('CrackTimeEstimator', () => {
  test('returns scenarios for each attacker model', () => {
    const estimates = CrackTimeEstimator.estimate(40);
    expect(estimates.length).toBe(CrackTimeEstimator.SCENARIOS.length);
    expect(estimates[0].seconds).toBeGreaterThan(0);
  });

  test('higher entropy increases crack time', () => {
    const low = CrackTimeEstimator.estimate(20)[0].seconds;
    const high = CrackTimeEstimator.estimate(60)[0].seconds;
    expect(high).toBeGreaterThan(low);
  });
});
