import chalk from 'chalk';
import { AnalysisResult } from '../types';

export class OutputFormatter {
  static formatJSON(result: AnalysisResult): string {
    return JSON.stringify(result, null, 2);
  }

  static formatHuman(result: AnalysisResult): string {
    const { entropy, crackTimes, policy, length } = result;

    let output = '';

    output += chalk.bold.blue('\n Password Security Analysis Report\n');
    output += chalk.gray('========================================\n\n');

    output += `${chalk.bold('Length:')} ${length} characters\n`;
    output += `${chalk.bold('Entropy:')} ${
      entropy.bits
    } bits (${this.getColorizedStrength(entropy.strength)})\n\n`;

    output += chalk.bold.underline('Estimated Crack Times:\n');
    crackTimes.forEach((ct) => {
      output += `  • ${chalk.cyan(ct.scenario)}: ${chalk.yellow(ct.displayTime)}\n`;
    });
    output += '\n';

    output += chalk.bold.underline('Policy Compliance:\n');
    if (policy.passed) {
      output += chalk.green('   Passed all checks\n');
    } else {
      policy.failedRules.forEach((rule) => {
        output += chalk.red(`   ${rule}\n`);
      });
    }

    output += '\n';
    return output;
  }

  private static getColorizedStrength(strength: string): string {
    switch (strength) {
      case 'Very Weak':
      case 'Weak':
        return chalk.red(strength);
      case 'Moderate':
        return chalk.yellow(strength);
      case 'Strong':
      case 'Very Strong':
        return chalk.green(strength);
      default:
        return strength;
    }
  }
}
