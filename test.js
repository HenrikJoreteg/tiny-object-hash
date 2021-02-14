require('./polyfill-crypto')
const test = require('tape')
const { deepSort, getObjectHash } = require('./index')

test('deepSort', t => {
  const start = {
    x: 1,
    a: 1,
    b: [
      { x: 1, a: 1 },
      { a: 1, c: 1 },
    ],
  }

  const beforeSortedString = JSON.stringify(start)
  const afterSort = deepSort(start)

  t.equal(
    JSON.stringify(afterSort),
    JSON.stringify({
      a: 1,
      b: [
        { a: 1, x: 1 },
        { a: 1, c: 1 },
      ],
      x: 1,
    }),
    'sorts object keys at multiple levels, does not re-order array items'
  )

  t.ok(start !== afterSort, 'returned a different object')
  t.equal(
    beforeSortedString,
    JSON.stringify(start),
    'no keys were re-arranged in original'
  )

  t.end()
})

test('getObjectHash', async t => {
  const start = {
    x: 1,
    a: 1,
    b: [
      { x: 1, a: 1 },
      { a: 1, c: 1 },
    ],
  }

  const resolveEqual = async (one, two, message) => {
    const [res1, res2] = await Promise.all([one, two])
    t.equal(res1, res2, message)
  }

  await resolveEqual(
    getObjectHash(start),
    getObjectHash(deepSort(start)),
    'hashes are same even though one had different key order'
  )

  await resolveEqual(
    getObjectHash({}),
    getObjectHash({}),
    'empty objects are same'
  )

  await resolveEqual(
    getObjectHash({ hi: 'there', you: 'there' }),
    getObjectHash({ you: 'there', hi: 'there' }),
    'simple objects'
  )

  await resolveEqual(
    getObjectHash({ hi: 'there', you: 'there' }, 'SHA-256'),
    'a690fe59cbef050deada64e3eba8e0bcb0488891a231d40189f8427c47c1b803',
    'supports other algos'
  )

  t.end()
})
