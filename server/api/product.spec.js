/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../db')
const Products = require('./products')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

// describe(Routes, () => {
// let testTable
// })

// beforeEach(async () => {
//   [testTable] = await seed()
// })

// describe(‘/products’, () => {
//   describe(‘GET /products’, () => {
//     it(‘sends all products’, () => {
//       return agent
//         .get(‘/api/products’)
//         .expect(200)
//         .then((res) => {
//           expect(res.body).to.be.an(‘array’)
//           expect(res.body.some(product => product.name === testTable.name)).to.equal(true)
//           expect(res.body.some(product => product.name === mocha.name)).to.equal(true)
//         })
//     })
//   })
