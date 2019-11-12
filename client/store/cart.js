import axios from 'axios'

//ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS'

const CLEAR_CART = 'CLEAR_CART'
//updating cart item quantity const UPDATE_CART = 'UPDATE_CART

//ACTION CREATORS
const getCart = cart => ({
  type: GET_CART_ITEMS,
  cart
})

const clearCart = () => ({
  type: CLEAR_CART
})

//THUNKS
export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/order')
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
    //dispatch(deleteItemFromCart(itemId))
    dispatch(fetchCart())
  } catch (error) {
    console.log(error)
  }
}

export const newOrderCreated = () => async dispatch => {
  try {
    const {data} = await axios.put(`/api/order/checkout`)
    dispatch(clearCart(data))
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
      return {checkout: action.data, cart: []}

    default:
      return state
  }
}
