/* eslint-disable @typescript-eslint/no-unsafe-argument */
import a from 'assertron';
import { anything } from 'satisfier';
import { TestResults } from 'test-progress-tracker';
import ProgressReporter from '.';
import { noCoverage } from './testResultsExamples';

test('mark filtered if there is testNamePattern', async () => {
  const subject = new ProgressReporter()
  let actual: TestResults
  subject.appendTestResult = (_, results) => {
    actual = results
    return Promise.resolve()
  }
  await subject.run({ testNamePattern: 'a' })
  subject.apply({ onTestRunComplete(fn) { fn(noCoverage as any) } })

  a.satisfies(actual!, { ...noCoverage, duration: anything, filtered: true })
})

test('mark filtered if there is testPathPattern', async () => {
  const subject = new ProgressReporter()
  let actual: TestResults
  subject.appendTestResult = (_, results) => {
    actual = results
    return Promise.resolve()
  }
  await subject.run({ testNamePattern: 'a' })
  subject.apply({ onTestRunComplete(fn) { fn(noCoverage as any) } })

  a.satisfies(actual!, { ...noCoverage, duration: anything, filtered: true })
})

test('mark filtered if there is testNamePattern and testPathPattern', async () => {
  const subject = new ProgressReporter()
  let actual: TestResults
  subject.appendTestResult = (_, results) => {
    actual = results
    return Promise.resolve()
  }
  await subject.run({ testNamePattern: 'y', testPathPattern: 'a' })
  subject.apply({ onTestRunComplete(fn) { fn(noCoverage as any) } })

  a.satisfies(actual!, { ...noCoverage, duration: anything, filtered: true })
})

test('not filtered if there is no testNamePattern or testPathPattern', async () => {
  const subject = new ProgressReporter()
  let actual: TestResults
  subject.appendTestResult = (_, results) => {
    actual = results
    return Promise.resolve()
  }

  await subject.run({})
  subject.apply({ onTestRunComplete(fn) { fn(noCoverage as any) } })

  a.satisfies(actual!, (e: TestResults) => e.filtered === undefined)
})

test('no test will not append', async () => {
  const subject = new ProgressReporter()
  subject.appendTestResult = () => { throw new Error('should not call') }

  await subject.run({})
  subject.apply({ onTestRunComplete(fn) { fn({} as any) } })
})

// function aggregateResult(testResults: TestResults) {
//   const result: jest.AggregatedResult = { ...testResults } as any
//   if (testResults.coverage) {
//     result.coverageMap = {
//       getCoverageSummary() { return testResults.coverage }
//     } as any
//   }

//   return result
// }
