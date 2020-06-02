const assert = require('chai').assert
const app = require('../function/function')

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1)
//     })
//   })
// })

const buy2 = app.buy(2,5)
const buy1 = app.buy(5,2)
const sleep = app.sleep('Hendra')

describe('buy', function() {
  it('function should return number', function() {
    // case for testing function
    let result = buy1
    assert.typeOf(result, 'string')
  })
})

describe('buy2', function() {
  it('Function should return string', function() {
    let result = buy2
    assert.typeOf(result, 'number')
  })
})

describe('function sleep', function() {
  it('Function should return string', function () {
    let result = sleep
    assert.typeOf(result, 'string')
    assert.equal(result, `Be quite ! ${sleep(name)} is sleeping...`)
  })
})