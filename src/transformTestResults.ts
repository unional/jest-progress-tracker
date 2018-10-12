export interface TestResults {
  startTime: number;
  duration: number;
  numFailedTests: number;
  numFailedTestSuites: number;
  numPassedTests: number;
  numPassedTestSuites: number;
  numTotalTests: number;
  numTotalTestSuites: number;
  coverage?: jest.CoverageSummary
}

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
  return coverageMap.getCoverageSummary() as any as jest.CoverageSummary
}
