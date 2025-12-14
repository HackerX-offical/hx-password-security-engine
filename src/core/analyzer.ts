import { AnalysisResult } from "../types";
import { EntropyEngine } from "../engines/entropy";
import { CrackTimeEstimator } from "../engines/crack-time";
import { PolicyEngine } from "../engines/policy";
import { CharsetEngine } from "../engines/charset";

export class PasswordAnalyzer {
  /**
   * Orchestrates the full analysis of a password.
   */
  static analyze(password: string): AnalysisResult {
    // 1. Calculate Entropy
    const entropy = EntropyEngine.calculate(password);

    // 2. Estimate Crack Time
    const crackTimes = CrackTimeEstimator.estimate(entropy.bits);

    // 3. Evaluate Policy
    const policy = PolicyEngine.evaluate(password);

    // 4. Character Analysis (not directly in result but used for entropy)
    const charset = CharsetEngine.analyze(password);

    return {
      timestamp: new Date().toISOString(),
      length: password.length,
      entropy: entropy,
      crackTimes: crackTimes,
      policy: policy,
      // We do NOT return the password in the result object to avoid logging it
    };
  }
}
