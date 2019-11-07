const {expect} = require('chai')
const db = require('../index')
const Products = db.model('products')

describe('Products model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a `name` and `price`', async () => {
      const dogSocks = await Products.create({
        name: 'dogs',
        price: 10,
        color: 'blue',
        theme: 'pets',
        description: 'blue dog socks',
        imageUrl:
          'https://c7.uihere.com/files/481/235/705/sock-stock-photography-christmas-stocking-illustration-socks-vector-material.jpg'
      })

      expect(dogSocks.name).to.equal('dogs')
      expect(dogSocks.price).to.equal('10.00')
    })

    it('`name` is required', async () => {
      const socks = await Products.build()
      return socks.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })
})
