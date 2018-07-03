
const stores = new Map()

export const getStore = () => {
  const id = Zone.current.get('id')

  return stores.get(id)
}

export const setStore = (store) => {
  const id = Zone.current.get('id')

  stores.set(id, store)
}

export const dropStore = () => {
  const id = Zone.current.get('id')

  stores.delete(id)
}

export const getState = () => getStore().getState()
export const dispatch = (...args) => getStore().dispatch(...args)

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

window.stores = stores
