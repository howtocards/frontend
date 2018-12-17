import { combineReducers } from "redux"

import { commonReducer as common } from "@features/common"
import { cardsReducer as cards, cardReducer as card } from "@features/cards"
import { usersReducer as users } from "@features/users"

export const rootReducer = combineReducers({
  common,
  cards,
  card,
  users,
})
