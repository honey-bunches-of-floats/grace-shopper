'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Products} = require('../server/db/models')

const products = [
  {
    name: 'rubber duckie',
    price: 18.0,
    color: 'multi',
    theme: 'limited edition',
    description: 'The perfect socks for debugging your code',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/m/a/magentoimage_ymzzmswkjxf0fxla.png?quality=80&fit=bounds&height=700&width=700&canvas=700%3A700'
  },
  {
    name: 'minecraft',
    price: 18.0,
    color: 'brown',
    theme: 'limited edition',
    description: 'Ready, set, Minecraft!',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/m/a/magentoimage_bpnruwbwtthmsshq.png?quality=80&fit=bounds&height=700&width=700&canvas=700%3A700'
  },
  {
    name: 'coffee',
    price: 18.0,
    color: 'blue',
    theme: 'limited edition',
    description: 'Coffee is always a great idea. Pour me another.',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_49c77caf-6945-40b0-bdbb-5da2d30111cfmagentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700%3A700'
  },
  {
    name: 'likes',
    price: 18.0,
    color: 'multi',
    theme: 'limited edition',
    description: 'Thumbs up, gotcha, like it, get it, got it, good',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/m/a/magentoimage_efipowfjba4k4qqu.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'zebras',
    price: 12.0,
    color: 'orange',
    theme: 'animals',
    description: 'In life, nothing is black and white, except the zebra',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_71669ae6-1eb1-4cc4-bc44-f67dac27e802magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'elephants',
    price: 12.0,
    color: 'black',
    theme: 'animals',
    description: "Let's talk about the elephants...on your feet.",
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_5cbef593-cdb4-495d-b9a9-186423d81ba9magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700%3A700'
  },
  {
    name: 'dogs',
    price: 12.0,
    color: 'black',
    theme: 'animals',
    description: 'These socks are Woofonderful! Dog lovers unite!',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/m/a/magentoimage_0rujncbo2jebknst.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'cats',
    price: 12.0,
    color: 'yellow',
    theme: 'animals',
    description: "These socks are the cat's meow.",
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/m/a/magentoimage_uf8yqhmvkmgfnavh.png?quality=80&fit=bounds&height=700&width=700&canvas=700%3A700'
  },
  {
    name: 'cereal',
    price: 14.0,
    color: 'pink',
    theme: 'food',
    description: "Endless bowls of Fruity-O's. Yes, please!",
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/m/a/magentoimage_92.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'pizza',
    price: 14.0,
    color: 'blue',
    theme: 'food',
    description: 'Serving up pizza socks with a side of pepperoni.',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_e18d7115-4ccc-4e15-8bcd-a7ae22c7e804magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700%3A700'
  },
  {
    name: 'ice cream',
    price: 14.0,
    color: 'black',
    theme: 'food',
    description: 'I scream, you scream, we all scream for ice cream!',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_a6086cc5-8763-4b2e-99d0-2de0a5f07f80magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'burgers and fries',
    price: 14.0,
    color: 'blue',
    theme: 'food',
    description: 'Burgers and Fries..supersized.',
    imageUrl:
      'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_8dfd126d-e336-469e-bfe4-941f9a894c77magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
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
