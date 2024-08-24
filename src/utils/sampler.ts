import { truncateArrayRight } from '@blackglory/structures'
import { sum } from 'extra-utils'

export class Sampler {
  private records: number[] = []

  constructor(private size: number) {}

  sample(value: number): void {
    this.records.push(value)
    truncateArrayRight(this.records, this.size)
  }

  get() {
    return this.records.reduce(sum) / this.records.length
  }
}
