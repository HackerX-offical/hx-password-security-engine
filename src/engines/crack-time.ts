import { AttackerScenario, CrackTimeResult } from "../types";

export class CrackTimeEstimator {
  private static readonly SECONDS_IN_YEAR = 31536000;
  private static readonly SECONDS_IN_DAY = 86400;
  private static readonly SECONDS_IN_HOUR = 3600;
  private static readonly SECONDS_IN_MINUTE = 60;

  static readonly SCENARIOS: AttackerScenario[] = [
    {
      name: "Online Attack (Throttled)",
      guessesPerSecond: 100 / 3600, // ~100 guesses per hour (strict locking)
      description: "Attacking a web service with strict rate limiting.",
    },
    {
      name: "Online Attack (Unthrottled)",
      guessesPerSecond: 100, // 100 requests/sec (botnet/no rate limit)
      description: "Attacking a service with no rate limiting or CAPTCHA.",
    },
    {
      name: "Offline Attack (Slow Hash)",
      guessesPerSecond: 1e4, // 10k/sec (e.g., bcrypt/Argon2 on robust hardware)
      description:
        "Cracking a stolen database with strong hashing (bcrypt/Argon2).",
    },
    {
      name: "Offline Attack (Fast Hash)",
      guessesPerSecond: 1e10, // 10B/sec (e.g., MD5/SHA1 on GPU cluster)
      description: "Cracking a stolen database with weak hashing (MD5/SHA1).",
    },
    {
      name: "Nation State (Massive Cluster)",
      guessesPerSecond: 1e14, // 100T/sec
      description: "Massive dedicated GPU/ASIC cluster for high-value targets.",
    },
  ];

  /**
   * Estimates crack time based on entropy and attacker scenarios.
   * Logic: Time = (2^Entropy) / GuessesPerSecond
   * Note: This assumes a random search. Average crack time is 50% of this,
   * but typically we report the full keyspace search time or 50% as "Average".
   * For safety, we will report the 50% probability (average case).
   */
  static estimate(entropyBits: number): CrackTimeResult[] {
    const totalCombinations = Math.pow(2, entropyBits);

    return this.SCENARIOS.map((scenario) => {
      // Average time to crack is usually half the search space
      const seconds = (totalCombinations * 0.5) / scenario.guessesPerSecond;
      return {
        scenario: scenario.name,
        seconds: seconds,
        displayTime: this.formatTime(seconds),
      };
    });
  }

  private static formatTime(seconds: number): string {
    if (seconds === Infinity) return "Forever";
    if (seconds < 1) return "Instant";

    if (seconds < this.SECONDS_IN_MINUTE)
      return `${Math.floor(seconds)} seconds`;
    if (seconds < this.SECONDS_IN_HOUR)
      return `${Math.floor(seconds / this.SECONDS_IN_MINUTE)} minutes`;
    if (seconds < this.SECONDS_IN_DAY)
      return `${Math.floor(seconds / this.SECONDS_IN_HOUR)} hours`;
    if (seconds < this.SECONDS_IN_YEAR)
      return `${Math.floor(seconds / this.SECONDS_IN_DAY)} days`;

    const years = Math.floor(seconds / this.SECONDS_IN_YEAR);
    if (years > 1e9) return "Centuries";
    return `${years} years`;
  }
}
