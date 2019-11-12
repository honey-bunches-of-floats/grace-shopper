import axios from 'axios'

//ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
//updating cart item quantity const UPDATE_CART = 'UPDATE_CART

//ACTION CREATORS
const getCart = cart => ({
  type: GET_CART_ITEMS,
  cart
})

const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

const clearCart = () => ({
  type: CLEAR_CART
})

//delete specific item from the cart
const deleteItemFromCart = productId => ({
  type: DELETE_FROM_CART,
  productId
})

//THUNKS
export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/order')
    console.log('data.product from fetchCart', data)
    dispatch(getCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const addingToCart = itemId => async dispatch => {
  try {
    await axios.put(`/api/order`, {itemId})
    dispatch(fetchCart())
  } catch (error) {
    console.log(error)
  }
}

// waiting for delete from order route to be written
export const deleteFromCart = itemId => async dispatch => {
  try {
    await axios.delete(`/api/order/${itemId}`)
    dispatch(deleteItemFromCart(itemId))
  } catch (error) {
    console.log(error)
  }
}

export const newOrderCreated = () => async dispatch => {
  console.log('====================')
  try {
    const {data} = await axios.put(`/api/order/checkout`)
    console.log('*******************')
    dispatch(clearCart(data))
    //history.push(`/orderCheckout/${data.id}`)
  } catch (error) {
    console.log(error)
  }
}

//REDUCER

//INITIAL STATE
const initialState = {
  cart: [],
  checkout: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {...state, cart: action.cart}

    case CLEAR_CART:
      return {...state, checkout: action.data, cart: []}

    case DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(input => input.productId !== action.productId)
      }
    default:
      return state
  }
}
