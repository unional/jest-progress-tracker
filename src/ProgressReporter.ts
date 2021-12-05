import { Config } from '@jest/types';
import type { JestHookSubscriber, WatchPlugin } from 'jest-watcher';
import { append, init } from 'test-progress-tracker';
import { transformTestResults } from './transformTestResults';

init()

export class ProgressReporter implements WatchPlugin {
  appendTestResult = append
  filtered: boolean
  // eslint-disable-next-line @typescript-eslint/require-await
  async run(config: Partial<Pick<Config.GlobalConfig, 'testNamePattern' | 'testPathPattern'>>) {
    this.filtered = !!(config.testNamePattern || config.testPathPattern)
  }
  apply(jestHooks: Pick<JestHookSubscriber, 'onTestRunComplete'>) {
    jestHooks.onTestRunComplete((results) => {
      const entry = transformTestResults(results)
      if (entry) {
        if (this.filtered) {
          entry.filtered = true
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.appendTestResult(undefined, entry)
      }
    })
  }
}
