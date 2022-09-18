export function lerp(alpha: number, previousValue: number, currentValue: number): number {
  return previousValue + (currentValue - previousValue) * alpha
}
