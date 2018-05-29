import { combineReducers } from 'redux'

import { accountReducer as account } from './features/account'


export const rootReducer = combineReducers({
  account,
})
