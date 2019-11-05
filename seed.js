const db = require('./db')
const Users = require('./server/db/models/user')
const Products = require('./server/db/models/products')
const { green } = require('chalk')

const users = [{
  email: 'cody@gmail.com',
  password: 'codycody',
},
{
  email: 'irene@gmail.com',
  password: 'irene'
},
{
  email: 'bananas@gmail.com',
  password: 'bananas'
}]

const products = [{
  name: 'zebra',
  price: 5,
  color: 'multi',
  theme: 'animals',
  description: 'zebra socks',
  size: 'L',
  imageUrl: 'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_71669ae6-1eb1-4cc4-bc44-f67dac27e802magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
},
{
  name: 'elephant',
  price: 7,
  color: 'multi',
  theme: 'animals',
  description: 'elephant socks',
  size: 'M',
  imageUrl: 'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_3a97012d-e305-400f-954f-2cb15c442ab8magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
},
{
  name: 'tulip',
  price: 4,
  color: 'multi',
  theme: 'flowers',
  description: 'tulip socks',
  size: 'M',
  imageUrl: 'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_b52e0c67-7c37-4e30-b489-f00561272d84magentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
},
{
  name: 'cereal',
  price: 8,
  color: 'pink',
  theme: 'food',
  description: 'cereal socks',
  size: 'S',
  imageUrl: 'https://www.happysocks.com/media/catalog/product/m/a/magentoimage_92.png?quality=80&fit=bounds&height=700&width=700&canvas=700:700'
}]







const syncDb = async () => {
  await db.sync({ force: true })
  await Promise.all(users.map(user => {
    return Users.create(user)
  }))
  await Promise.all(products.map(product => {
    return Products.create(product)
  }))
  console.log(green('Seeding success!'))
  db.close()
}

module.exports = syncDb
