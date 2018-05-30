import { combineReducers } from 'redux';

import { REQUEST_ITEMS, RECEIVE_ITEMS } from '../actions';

function fetchItems(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_ITEMS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  fetchItems
})

export default rootReducer