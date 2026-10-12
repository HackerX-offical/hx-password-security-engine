import { PolicyResult, PolicyRule } from '../types';

export class PolicyEngine {
  /*
   * Standard NIST-inspired rules
   * NIST SP 800-63B recommends:
   * - Min length 8 (often 12+ for higher security)
   * - No composition rules (e.g., "must have 1 number")
   * - Check against compromised passwords (we simulate this or use a list, but we are offline for now so we won't check HaveIBeenPwned)
   * For this engine, we will implement flexible rules.
   */
  private static readonly RULES: PolicyRule[] = [
    {
      id: 'min-length-8',
      description: 'Password must be at least 8 characters long.',
      validate: (pwd) => pwd.length >= 8,
    },
    {
      id: 'min-length-12',
      description: 'Password should be at least 12 characters long for better security.',
      validate: (pwd) => pwd.length >= 12,
    },
    {
      id: 'max-length-64',
      description: 'Password should not exceed 64 characters (potential DoS/hashing issues).',
      validate: (pwd) => pwd.length <= 64,
    },
    {
      id: 'no-whitespace-trim',
      description: 'Password should not start or end with whitespace.',
      validate: (pwd) => pwd.trim() === pwd,
    },
  ];

  static evaluate(password: string): PolicyResult {
    const failedRules: string[] = [];

    for (const rule of this.RULES) {
      if (!rule.validate(password)) {
        failedRules.push(rule.description);
      }
    }

    // Pass strictly only if no "Must" rules failed?
    // For now, we return detailed failure list.
    // Length 8 is a hard fail, others might be warnings.
    // We'll simplify: if length < 8, it is a Fail. if length >= 8 but < 12, it's a "Weak".

    return {
      passed: failedRules.length === 0,
      failedRules,
    };
  }
}
