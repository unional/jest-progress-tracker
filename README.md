# jest-progress-tracker

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Codecov][codecov-image]][codecov-url]
[![Coverage Status][coveralls-image]][coveralls-url]

[![Greenkeeper badge][green-keeper-image]][green-keeper-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

Track test progress for jest.

## Usage

To use `jest-progress-tracker`,
add it to the `reporters` section of the Jest configuration:

```js
{
  "jest": {
    "reporters": [
      "default", // using default reporter
      "jest-progress-tracker"
    ]
  }
}
```

[codecov-image]: https://codecov.io/gh/unional/jest-progress-tracker/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/jest-progress-tracker
[coveralls-image]: https://coveralls.io/repos/github/unional/jest-progress-tracker/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/jest-progress-tracker
[downloads-image]: https://img.shields.io/npm/dm/jest-progress-tracker.svg?style=flat
[downloads-url]: https://npmjs.org/package/jest-progress-tracker
[green-keeper-image]:https://badges.greenkeeper.io/unional/jest-progress-tracker.svg
[green-keeper-url]:https://greenkeeper.io/
[npm-image]: https://img.shields.io/npm/v/jest-progress-tracker.svg?style=flat
[npm-url]: https://npmjs.org/package/jest-progress-tracker
[semantic-release-image]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[travis-image]: https://img.shields.io/travis/unional/jest-progress-tracker/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/jest-progress-tracker?branch=master
