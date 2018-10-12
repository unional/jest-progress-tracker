import t from 'assert';
import { minifyTestResults } from './minifyTestResults';
import { noCoverage, noCoverageMinified, coverageNoPercentage, coverageNoPercentageMinified, coverageWithPercentage, coverageWithPercentageMinified } from './testResultsExamples';

test('no coverage', () => {
  const actual = minifyTestResults(noCoverage)
  t.deepStrictEqual(actual, noCoverageMinified)
})

test.only('with coverage no percentage', () => {
  const actual = minifyTestResults(coverageNoPercentage)
  t.deepStrictEqual(actual, coverageNoPercentageMinified)
})

test('with coverage with percentage', () => {
  const actual = minifyTestResults(coverageWithPercentage)
  t.deepStrictEqual(actual, coverageWithPercentageMinified)
})
