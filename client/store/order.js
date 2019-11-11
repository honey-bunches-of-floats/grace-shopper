/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'
const CREATE_ORDER = 'POST_ORDER'
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const BUY_ORDER = 'BUY_ORDER'
const GET_ORDER = 'GET_ORDER'

//order details for checkout
const createOrder = orderDetails => {
  return {
    type: CREATE_ORDER,
    orderDetails
  }
}

//action for admin
//Tier 3
const getAllOrders = orders => ({
  type: GET_ALL_ORDERS,
  orders
})

const getOrder = order => ({
  type: GET_ORDER,
  order
})

const buyOrder = id => ({
  type: buyOrder,
  id
})

//THUNK
//post to database and send browser 'history' to checkout url
export const newOrderCreated = subtotal => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders`, {price: subtotal})
    dispatch(createOrder(data))
    history.push(`/orderCheckout/${data.id}`)
  } catch (error) {
    console.log(error)
  }
}

//admin action?
export const fetchAllOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(getAllOrders(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(getOrder(data))
  } catch (error) {
    console.error(error)
  }
}

export const purchaseOrder = id => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${id}`)
    dispatch(buyOrder(data))
    history.push(`/orders/${data.id}`)
  } catch (error) {
    console.error(error)
  }
}
//initialState
const initialState = {
  newOrder: {},
  orders: [],
  order: {}
}

//RETURNS
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return action.orderDetails
    case GET_ALL_ORDERS:
      return {...state, orders: action.orders}
    case GET_ORDER:
      return {...state, order: action.order}
    case BUY_ORDER:
      const updateId = Number(action.order.id)
      const orders = state.orders.map(order => {
        if (order.id === updateId) {
          order.status = 'paid'
        }
        return order
      })
      return {
        ...state,
        orders
      }
    default:
      return initialState
  }
}