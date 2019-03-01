import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

import { commonReducer as common } from "@features/common"
import { cardsReducer as cards } from "@features/cards"
import { usersReducer as users } from "@features/users"

export const createReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    common,
    cards,
    users,
  })
