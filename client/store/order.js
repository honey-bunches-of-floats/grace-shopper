import axios from 'axios'

//ACTION TYPES
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'

//ACTION CREATORS
const getOrders = orders => ({
  type: GET_ALL_ORDERS,
  orders
})

const createOrder = order => ({
  type: CREATE_ORDER,
  order
})

//INITIAL STATE
const initialState = {
  list: [],
  newOrder: {}
}

//THUNKS
//all orders...account holders and guests
export const fetchAllOrders = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/`)
    dispatch(getOrders(data))
  } catch (error) {
    console.error(error)
  }
}

//Tier 3?
//get user order by id
export const fetchUserOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/user/${id}`)
    dispatch(getOrders(data))
  } catch (error) {
    console.log(error)
  }
}

export const createNewOrder = order => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders/checkout', order)
      dispatch(createOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {...state, list: action.orders}
    case CREATE_ORDER:
      // const newOrderState = state
      // newOrderState.payload.push(action.order)
      return {...state, newOrder: action.order}
    default:
      return state
  }
}
