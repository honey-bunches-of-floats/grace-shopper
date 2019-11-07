/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Products = db.model('products')
const supertest = require('supertest')
const agent = supertest.agent(app)

describe('Products routes', () => {
  let dogs, frog

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const sockType = 'dogs'

    beforeEach(() => {
      return Products.create({
        name: sockType,
        price: 10,
        color: 'blue',
        theme: 'pets',
        description: 'blue dog socks',
        imageUrl:
          'https://c7.uihere.com/files/481/235/705/sock-stock-photography-christmas-stocking-illustration-socks-vector-material.jpg'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(sockType)
    }) // end describe GET ('/api/products')

    // describe('GET /products/:id', () => {
    //   it('gets the product with the specified id', async () => {
    //     await agent
    //       .get(`/api/products/${zebra.id}`)
    //       .expect(200)
    //       .then(res => {
    //         expect(res.body).to.be.an('object')
    //         expect(res.body.name).to.equal('zebra')
    //       })

    //     await agent
    //       .get(`/api/products/${elephant.id}`)
    //       .expect(200)
    //       .then(res => {
    //         expect(res.body).to.be.an('object')
    //         expect(res.body.name).to.equal('frog')
    //       })
    //   })

    //   it('sends a 404 if not found', () => {
    //     return agent.get(`/api/product/20`).expect(404)
    //   })
    // })
  }) // end describe('/api/products')
}) // end describe('Products routes')
