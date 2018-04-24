# babel-plugin-cjs-modular-lodash

This is a babel plugin to replace uses of `_.method` with `const _method = require('lodash/method'); _method;` to reduce client-side JS bundle sizes.

### Assumptions

This plugin assumes that lodash is either available as `global._` or has been imported into a file  as `_`.

This plugin will continue to include the entire lodash library (and therefore be rendered mostly useless) if any of the following are used:
```
const lodash = require('lodash'); // not using _ for lodash const
const { map } = require('lodash'); // destructured import of entire lodash
const fp = require('lodash/fp'); // import of entire lodash/fp
```

## Setup
```
npm install
```

## Testing
To run jest tests: `npm test`
To run eslint: `npm run lint`
To run lint and tests: `npm run lint-and-test`
