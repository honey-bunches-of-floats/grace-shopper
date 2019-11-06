import axios from 'axios'
//Refactoring the cart to live on redux store
//ACTION TYPES
export const GET_CART_ITEMS = 'GET_CART_ITEMS'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

//ACTION CREATORS
const getCartItems = items => ({
  type: GET_CART_ITEMS,
  items
})

const updateCart = item => ({
  type: UPDATE_CART,
  item
})

//delete specific item
const deleteItem = productId => ({
  type: DELETE_FROM_CART,
  productId
})

//INITIAL STATE
const initialState = [] //we're just talking about one piece of the state

//THUNKS

// export const fetchCart = () => async dispatch => {
//   try {
//     const res = await axios.get('/api/cart')
//     dispatch(getCartItems(res.data))
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const addItemToCart = cartItem => async dispatch => {
//   try {
//     const {data} = await axios.post(`/api/me`, cartItem)
//     dispatch(updateCart(data))
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const updateQuantity = (productId, quantity) => async dispatch => {
//   try {
//     const response = await axios.put(`/api/me/cart/${productId}`, {
//       quantity: quantity
//     })
//     const updatedCart = response.data
//     dispatch(updateCart(updatedCart))
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const removeFromCart = productId => async dispatch => {
//   try {
//     await axios.delete(`/api/me/cart/${productId}`)
//     dispatch(deleteItem(productId))
//   } catch (error) {
//     console.log(error)
//   }
// }

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS: {
      return {
        ...state,
        cart: action.items
      }
    }
    case UPDATE_CART: {
      return {...state, cart: action.item}
    }
    case DELETE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(input => input.productId !== action.productId)
      }
    }
    default:
      return state
  }
}
