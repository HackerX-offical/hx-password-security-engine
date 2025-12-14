import { CharsetEngine } from "./charset";
import { EntropyResult } from "../types";

export class EntropyEngine {
  /**
   * Calculates Shannon Entropy in bits.
   * optimize: Uses standard combinatorial entropy logic for passwords: E = L * log2(R)
   * where L is length and R is the pool size.
   */
  static calculate(password: string): EntropyResult {
    const analysis = CharsetEngine.analyze(password);
    const poolSize = CharsetEngine.getPoolSize(analysis);

    if (poolSize === 0 || password.length === 0) {
      return { bits: 0, strength: "Very Weak" };
    }

    const bits = Math.floor(password.length * Math.log2(poolSize));

    return {
      bits,
      strength: this.categorizeStrength(bits),
    };
  }

  private static categorizeStrength(bits: number): EntropyResult["strength"] {
    if (bits < 28) return "Very Weak";
    if (bits < 36) return "Weak";
    if (bits < 60) return "Moderate";
    if (bits < 128) return "Strong";
    return "Very Strong";
  }
}
