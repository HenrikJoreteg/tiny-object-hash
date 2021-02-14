# tiny-object-hash

![](https://img.shields.io/npm/dm/tiny-object-hash.svg)![](https://img.shields.io/npm/v/tiny-object-hash.svg)![](https://img.shields.io/npm/l/tiny-object-hash.svg)

Tiny lib sorts keys and generates hash for JSON serializable objects so they can be compared across a network without having to send them back and forth. ~500 bytes. No dependencies.

Works in browser and node (if you polyfill webcrypto in node).

- Sorts keys of objects first (without editing original).
- Uses simple is object check, meant so for comparing JSON serializeable "plain" JavaScript objects.

Uses web crypto to generate hashes in browser, polyfill it in node.js with [github.com/PeculiarVentures/webcrypto](github.com/PeculiarVentures/webcrypto). In node.js just include this line first:

`require('tiny-object-hash/polyfill-crypto')`

## two exports

```js
/**
 * @param {object} obj Object to get a hash from
 * @param {'SHA-1'|'SHA-256'|'SHA-384'|'SHA-512'} algo One of supported subtle crypto digest formats
 * @returns {Promise<string>} Promise that resolves to a string containing the hash
 */
const getObjectHash = (obj, algo = 'SHA-1') => { ... }
```

```js
/**
 * @param {object} obj Object to sort.
 * @returns {object} Copy of object with keys sorted in all nested objects
 */
const deepSort = obj => { ... }
```

## tests

`npm test`

## install

```
npm install tiny-object-hash
```

## Change log

- `1.0.0`: Initial release.

## credits

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

Props to [PeculiarVentures](github.com/PeculiarVentures/webcrypto) for building a WebCrypto polyfill for node.js and [IndigoUnited](https://github.com/IndigoUnited/js-deep-sort-object#readme) for the inspiration for the deep sort implementation.

## license

[MIT](http://mit.joreteg.com/)
