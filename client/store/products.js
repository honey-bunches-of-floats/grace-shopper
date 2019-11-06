import axios from 'axios'

//action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//action creators
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

//thunks
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/')
    dispatch(getProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchAProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

//initial state

const initialState = []

//reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
