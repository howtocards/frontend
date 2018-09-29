import { combineReducers } from 'redux'

import { commonReducer as common } from 'features/common'
import { accountReducer as account } from 'features/account'
import { cardsReducer as cards, cardReducer as card } from 'features/cards'


export const rootReducer = combineReducers({
  account,
  common,
  cards,
  card,
})
