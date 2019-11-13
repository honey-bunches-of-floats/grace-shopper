/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'
const BUY_ORDER = 'BUY_ORDER'
const GET_ORDER = 'GET_ORDER'
const GOT_ORDER_HISTORY = 'GOT_ORDER_HISTORY'

//order details for checkout

//action for admin
//Tier 3

const getOrder = order => ({
  type: GET_ORDER,
  order
})

const buyOrder = id => ({
  type: buyOrder,
  id
})

const gotOrderHistory = orders => ({
  type: GOT_ORDER_HISTORY,
  orders
})
//THUNK

//admin action?

export const fetchOrder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order/${id}`)
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

export const getOrderHistory = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/order/orderHistory')
    console.log('orderHistory data from thunk:', data)
    dispatch(gotOrderHistory(data))
  } catch (error) {
    console.log(error)
  }
}

//initialState
const initialState = {
  orders: [],
  order: {},
  orderHistory: []
}

//RETURNS
export default function(state = initialState, action) {
  switch (action.type) {
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
    case GOT_ORDER_HISTORY:
      return {...state, orderHistory: action.orders}

    default:
      return state
  }
}
