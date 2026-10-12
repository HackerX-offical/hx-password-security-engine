/** Human-readable duration for crack-time estimates (seconds). */
export function formatDurationSeconds(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return 'unknown';
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)}h`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)}d`;
  return `${(seconds / 31536000).toFixed(1)}y`;
}
