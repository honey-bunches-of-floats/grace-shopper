/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchProducts} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllProducts', () => {
    it('dispatches the GET ALL PRODUCTS action', () => {
      const sampleProduct = {
        id: 1,
        name: 'coffee',
        price: 18.0,
        color: 'blue',
        theme: 'limited edition',
        description: 'Coffee is always a great idea. Pour me another.',
        imageUrl:
          'https://www.happysocks.com/media/catalog/product/h/t/httpsasset.productmarketingcloud.comapiassetstorage233_49c77caf-6945-40b0-bdbb-5da2d30111cfmagentoimage.png?quality=80&fit=bounds&height=700&width=700&canvas=700%3A700'
      }
      mockAxios.onGet('/api/products').replyOnce(200, sampleProduct)
      return store.dispatch(fetchProducts()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_PRODUCTS')
        expect(actions[0]).to.be.deep.equal(sampleProduct)
      })
    })
  })
})
