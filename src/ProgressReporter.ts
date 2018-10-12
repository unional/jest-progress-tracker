import fs from 'fs';
import { appendTestResults } from './appendTestResults';
import { RESULT_FILEPATH } from './constants';
import { transformTestResults } from './transformTestResults';

export class ProgressReporter implements jest.Reporter {
  appendTestResult = appendTestResults
  onRunComplete(_context: any, results: jest.AggregatedResult) {
    const entry = transformTestResults(results)
    this.appendTestResult({ fs }, RESULT_FILEPATH, entry)
  }
}
