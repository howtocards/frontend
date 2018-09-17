import { combineReducers } from 'redux'

import { commonReducer as common } from 'features/common'
import { accountReducer as account } from 'features/account'
import { cardsReducer as cards } from 'features/cards'


export const rootReducer = combineReducers({
  account,
  common,
  cards,
})
