import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllProducts from './allProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

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
  }
]

describe('AllProducts', () => {
  it('renders div for products', () => {
    const wrapper = shallow(<AllProducts />)
    expect(wrapper.find('div'))
  })
})
