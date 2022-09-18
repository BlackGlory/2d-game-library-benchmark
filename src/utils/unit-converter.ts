export class UnitConverter {
  constructor(private pixelsPerMeter: number) {}

  pixelToMeter(value: number): number {
    return value / this.pixelsPerMeter
  }

  meterToPixel(value: number): number {
    return value * this.pixelsPerMeter
  }
}
