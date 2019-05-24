import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

import { cardsReducer as cards } from "@features/cards"

export const createReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    cards,
  })
