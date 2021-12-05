import type { AggregatedResult } from '@jest/test-result';
import type { CoverageMap } from 'istanbul-lib-coverage';
import { CoverageSummary, TestResults } from 'test-progress-tracker';

export function transformTestResults(testResults: AggregatedResult): TestResults | undefined {
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

function transformCoverage(coverageMap: CoverageMap | null | undefined) {
  if (!coverageMap) return undefined
  return coverageMap.getCoverageSummary() as any as CoverageSummary
}
