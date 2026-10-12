import { formatDurationSeconds } from './time-format';

describe('formatDurationSeconds', () => {
  test('formats sub-minute durations', () => {
    expect(formatDurationSeconds(30)).toBe('30s');
  });

  test('formats years for huge values', () => {
    expect(formatDurationSeconds(31536000 * 2)).toContain('y');
  });
});
