import { TestResults } from './transformTestResults';

export interface MinifiedTestResult {
  d: number,
  f: number,
  fs: number,
  p: number,
  ps: number,
  t: number,
  ts: number,
  s: number,
  c?: MinifiedCoverageSummary
}
export interface MinifiedCoverageSummary {
  b: { c: number, s: number, t: number, p?: number }
  f: { c: number, s: number, t: number, p?: number }
  l: { c: number, s: number, t: number, p?: number }
  s: { c: number, s: number, t: number, p?: number }
}

export function minifyTestResults(testResults: TestResults) {
  const { duration, numFailedTests, numFailedTestSuites, numPassedTests, numPassedTestSuites, numTotalTests, numTotalTestSuites, startTime, coverage } = testResults

  const result: MinifiedTestResult = {
    d: duration,
    f: numFailedTests,
    fs: numFailedTestSuites,
    p: numPassedTests,
    ps: numPassedTestSuites,
    t: numTotalTests,
    ts: numTotalTestSuites,
    s: startTime
  }
  if (coverage) {
    result.c = compressCoverage(coverage)
  }
  return result
}

function compressCoverage(coverage: jest.CoverageSummary) {
  const { branches, functions, lines, statements } = coverage

  const result: MinifiedCoverageSummary = {
    b: { c: branches.covered, s: branches.skipped, t: branches.total },
    f: { c: functions.covered, s: functions.skipped, t: functions.total },
    l: { c: lines.covered, s: lines.skipped, t: lines.total },
    s: { c: statements.covered, s: statements.skipped, t: statements.total }
  }

  if (branches.pct) result.b.p = branches.pct
  if (functions.pct) result.f.p = functions.pct
  if (lines.pct) result.l.p = lines.pct
  if (statements.pct) result.s.p = statements.pct
  return result
}
