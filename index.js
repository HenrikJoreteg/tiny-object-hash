/**
 * @param {object} obj Object to sort.
 * @returns {object} Copy of object with keys sorted in all nested objects
 */
const deepSort = obj => {
  if (Array.isArray(obj)) {
    return obj.map(item => deepSort(item))
  }
  if (obj && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((out, key) => {
        out[key] = deepSort(obj[key])
        return out
      }, {})
  }
  return obj
}

/**
 * @param {object} obj Object to get a hash from
 * @param {'SHA-1'|'SHA-256'|'SHA-384'|'SHA-512'} algo One of supported subtle crypto digest formats: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 * @returns {Promise<string>} Promise that resolves to a string containing the hash
 */
const getObjectHash = (obj, algo = 'SHA-1') =>
  crypto.subtle
    .digest(algo, new TextEncoder().encode(JSON.stringify(deepSort(obj))))
    .then(hashBuffer =>
      Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    )

module.exports = {
  getObjectHash,
  deepSort,
}
