import { combineReducers } from 'redux'

import { commonReducer as common } from 'features/common'
import { accountReducer as account } from 'features/account'


export const rootReducer = combineReducers({
  account,
  common,
})
