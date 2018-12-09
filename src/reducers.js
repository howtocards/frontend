import { combineReducers } from "redux"

import { commonReducer as common } from "@features/common"
import { cardsReducer as cards, cardReducer as card } from "@features/cards"

export const rootReducer = combineReducers({
  common,
  cards,
  card,
})
