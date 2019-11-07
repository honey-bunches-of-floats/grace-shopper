import axios from 'axios'

//ACTION TYPES
export const GET_CART_ITEMS = 'GET_CART_ITEMS'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

//ACTION CREATORS
const getItems = items => ({
  type: GET_CART_ITEMS,
  items
})

const updateCart = cart => ({
  type: UPDATE_CART,
  cart
})

//delete specific item from the cart
const deleteItemFromCart = productId => ({
  type: DELETE_FROM_CART,
  productId
})

//INITIAL STATE
const initialState = []

//THUNKS
export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/order')
    dispatch(getItems(data))
  } catch (error) {
    console.log(error)
  }
}

export const addToCart = cartItem => async dispatch => {
  try {
    const {data} = await axios.post(`/api/order`, cartItem)
    dispatch(updateCart(data))
  } catch (error) {
    console.log(error)
  }
}

// export const updateQty = (productId, qty) => async dispatch => {

// }

export const deleteFromCart = productId => async dispatch => {
  try {
    await axios.delete(`/api/order/cart/${productId}`)
    dispatch(deleteItemFromCart(productId))
  } catch (error) {
    console.log(error)
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS: {
      return action.items
    }
    case UPDATE_CART: {
      return action.cart
    }
    case DELETE_FROM_CART: {
      return state.filter(input => input.productId !== action.productId)
    }
    default:
      return state
  }
}
