import { AnalysisResult } from '../types';

export function toAnalysisJson(result: AnalysisResult): string {
  return JSON.stringify(result, null, 2);
}
