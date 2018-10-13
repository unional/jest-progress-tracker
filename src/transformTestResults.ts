import { CoverageSummary, TestResults } from '@unional/test-progress-tracker';

export function transformTestResults(testResults: jest.AggregatedResult): TestResults | undefined {
  const {
    numFailedTests,
    numFailedTestSuites,
    numPassedTests,
    numPassedTestSuites,
    numTotalTests,
    numTotalTestSuites,
    startTime,
    wasInterrupted,
    coverageMap
  } = testResults

  if (wasInterrupted) return undefined

  if (!numTotalTests) return undefined

  return {
    startTime,
    duration: new Date().getTime() - startTime,
    numFailedTests,
    numFailedTestSuites,
    numPassedTests,
    numPassedTestSuites,
    numTotalTests,
    numTotalTestSuites,
    coverage: transformCoverage(coverageMap)
  }
}

function transformCoverage(coverageMap: jest.Maybe<jest.CoverageMap>) {
  if (!coverageMap) return undefined
  return coverageMap.getCoverageSummary() as any as CoverageSummary
}
