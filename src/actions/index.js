import fetch from 'cross-fetch';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';


function requestItems() {
  return { type: REQUEST_ITEMS }
}

function receiveItems(items) {
  return {
    type: RECEIVE_ITEMS,
    items: items,
    receiveAt: Date.now()
  }
}

export function fetchItems() {
  return dispatch => {
    dispatch(requestItems());
    return fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
      .then(response => response.json())
      .then(itemIds => {
        return Promise.all(itemIds.slice(0, 30).map(itemId => fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)));
      })
      .then(response => Promise.all(response.map(o => o.json())))
      .then(items => dispatch(receiveItems(items)))
  }
}

