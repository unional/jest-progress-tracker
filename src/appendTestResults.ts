import fs from 'fs';
import lz from 'lz-string'
import { minifyTestResults, MinifiedTestResult } from './minifyTestResults';
import { TestResults } from './transformTestResults';

export interface AppendContext {
  fs: typeof fs
}

export function appendTestResults({ fs }: AppendContext, filePath: string, results: TestResults | undefined) {
  if (results) {
    const minified = minifyTestResults(results)
    const compressed = compress(minified)
    fs.appendFile(filePath, compressed + '\n', () => { })
  }
}

export function compress(obj: MinifiedTestResult) {
  const str = JSON.stringify(obj)
  return lz.compress(str) as string
}

export function decompress(str: string) {
  const json = lz.decompress(str)
  return JSON.parse(json) as MinifiedTestResult
}
