'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Products} = require('../server/db/models')

const products = [
  {
    name: 'zebra',
    price: 5.0,
    color: 'multi',
    theme: 'animals',
    description: 'zebra socks',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_71669ae6-1eb1-4cc4-bc44-f67dac27e802magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'elephant',
    price: 7.0,
    color: 'multi',
    theme: 'animals',
    description: 'elephant socks',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_3a97012d-e305-400f-954f-2cb15c442ab8magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'tulip',
    price: 4.0,
    color: 'multi',
    theme: 'flowers',
    description: 'tulip socks',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_b52e0c67-7c37-4e30-b489-f00561272d84magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'cereal',
    price: 8.0,
    color: 'pink',
    theme: 'food',
    description: 'cereal socks',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/m/a/magentoimage_92.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const socks = await Promise.all(
    products.map(product => {
      return Products.create(product)
    })
  )
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${socks.length} socks`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
