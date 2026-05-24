import { truncateArrayRight } from '@blackglory/structures'
import { avg } from 'iterable-operator'
import { isntEmptyArray } from 'extra-utils'

export class Sampler {
  private records: number[] = []

  constructor(private size: number) {}

  sample(value: number): void {
    this.records.push(value)
    truncateArrayRight(this.records, this.size)
  }

  get(): number {
    if (isntEmptyArray(this.records)) {
      return avg(this.records)
    } else {
      return 0
    }
  }
}
