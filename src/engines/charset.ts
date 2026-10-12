import { CharsetAnalysis } from '../types';

export class CharsetEngine {
  /**
   * Analyzes the composition of the password.
   */
  static analyze(password: string): CharsetAnalysis {
    let lowercase = 0;
    let uppercase = 0;
    let digits = 0;
    let symbols = 0;
    const uniqueChars = new Set<string>();

    for (const char of password) {
      uniqueChars.add(char);
      const code = char.charCodeAt(0);

      if (code >= 97 && code <= 122) {
        lowercase++;
      } else if (code >= 65 && code <= 90) {
        uppercase++;
      } else if (code >= 48 && code <= 57) {
        digits++;
      } else {
        symbols++;
      }
    }

    return {
      lowercase,
      uppercase,
      digits,
      symbols,
      length: password.length,
      uniqueChars: uniqueChars.size,
    };
  }

  /**
   * Returns the pool size based on the character sets used.
   * Standard simplified pool sizes:
   * Lowercase: 26
   * Uppercase: 26
   * Digits: 10
   * Symbols: 33 (Standard ASCII symbols)
   */
  static getPoolSize(analysis: CharsetAnalysis): number {
    let pool = 0;
    if (analysis.lowercase > 0) pool += 26;
    if (analysis.uppercase > 0) pool += 26;
    if (analysis.digits > 0) pool += 10;
    if (analysis.symbols > 0) pool += 33;

    // Minimum pool size is 1 to avoid log(0) errors if empty string (though empty should be caught earlier)
    return pool === 0 ? 0 : pool;
  }
}
