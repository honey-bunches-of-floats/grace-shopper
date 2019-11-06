import axios from 'axios'
import {DELETE} from 'sequelize/types/lib/query-types'

//ACTION TYPES
const ALL_ITEMS = 'ALL_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

//ACTION CREATORS
const allItems = items => ({
  type: ALL_ITEMS,
  items
})

const addItem = item => ({
  type: ADD_ITEM,
  item
})

const deleteItem = item => ({
  type: DELETE_ITEM,
  item
})

// THUNKS

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_ITEMS:
      return action.items
    case ADD_ITEM:
      return action.item
    case DELETE_ITEM:
      return state.filter
    default:
      return state
  }
}
