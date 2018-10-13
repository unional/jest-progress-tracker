import a from 'assertron';
import { transformTestResults } from './transformTestResults';
import { isInRange } from 'satisfier';

test('return undefined if test was interrupted', () => {
  expect(transformTestResults(createTestResults({ numFailedTests: 1, numTotalTests: 1, wasInterrupted: true }))).toBeUndefined()
})

test('no coverage is ok', () => {
  const testResults = createTestResults({ numFailedTests: 1, numTotalTests: 1 })

  a.satisfy(transformTestResults(testResults), testResults)
})

test('skipped test run will be undefined', () => {
  expect(transformTestResults(createTestResults({ numTotalTests: 0 }))).toBeUndefined()
})

test('coverage', () => {
  const testResults = createTestResults({
    numTotalTests: 1,
    coverageMap: {
      getCoverageSummary: () => ({
        branches: { covered: 0, skipped: 0, total: 0 },
        functions: { covered: 0, skipped: 0, total: 0 },
        lines: { covered: 0, skipped: 0, total: 0 },
        statements: { covered: 0, skipped: 0, total: 0 }
      })
    } as any
  })
  const actual = transformTestResults(testResults)
  a.satisfy(actual, {
    coverage: {
      branches: { covered: 0, skipped: 0, total: 0 },
      functions: { covered: 0, skipped: 0, total: 0 },
      lines: { covered: 0, skipped: 0, total: 0 },
      statements: { covered: 0, skipped: 0, total: 0 }
    }
  })
})
test('record duration', () => {
  a.satisfy(transformTestResults(createTestResults({ numTotalTests: 1, startTime: new Date().getTime() - 100 })), { duration: isInRange(100, 101) })
})

test('has start time', () => {
  const startTime = new Date().getTime()
  a.satisfy(transformTestResults(createTestResults({ numTotalTests: 1, startTime })), { startTime })
})

function createTestResults(partial: Partial<jest.AggregatedResult>) {
  return partial as jest.AggregatedResult
}
