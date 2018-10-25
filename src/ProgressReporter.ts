import { append, init } from 'test-progress-tracker';
import { transformTestResults } from './transformTestResults';

init()

export class ProgressReporter implements jest.Reporter {
  appendTestResult = append
  filtered: boolean
  constructor(config: Pick<jest.GlobalConfig, 'testNamePattern' | 'testPathPattern'>) {
    this.filtered = !!(config.testNamePattern || config.testPathPattern)
  }

  onRunComplete(_: any, results: jest.AggregatedResult) {
    const entry = transformTestResults(results)
    if (entry) {
      if (this.filtered) {
        entry.filtered = true
      }
      // tslint:disable-next-line: no-floating-promises
      this.appendTestResult(undefined, entry)
    }
  }
}
