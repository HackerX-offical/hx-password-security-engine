export interface CharsetAnalysis {
  lowercase: number;
  uppercase: number;
  digits: number;
  symbols: number;
  length: number;
  uniqueChars: number;
}

export interface EntropyResult {
  bits: number;
  strength: "Very Weak" | "Weak" | "Moderate" | "Strong" | "Very Strong";
}

export interface AttackerScenario {
  name: string;
  guessesPerSecond: number;
  description: string;
}

export interface CrackTimeResult {
  scenario: string;
  seconds: number;
  displayTime: string; // e.g., "300 years", "5 minutes"
}

export interface PolicyRule {
  id: string;
  description: string;
  validate: (password: string) => boolean;
}

export interface PolicyResult {
  passed: boolean;
  failedRules: string[]; // List of descriptions
}

export interface AnalysisResult {
  password?: string; // Optional, usually omitted for security in logs
  timestamp: string;
  length: number;
  entropy: EntropyResult;
  crackTimes: CrackTimeResult[];
  policy: PolicyResult;
}
