import { PasswordAnalyzer } from '../core/analyzer';
import { toAnalysisJson } from './json-report';

describe('toAnalysisJson', () => {
  test('serializes analysis without password field', () => {
    const json = toAnalysisJson(PasswordAnalyzer.analyze('test-password-1234'));
    const parsed = JSON.parse(json);
    expect(parsed.entropy).toBeDefined();
    expect(parsed.password).toBeUndefined();
  });
});
