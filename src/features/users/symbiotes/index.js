import { combineReducers } from "redux"

import { reducer as current } from "./current"
import { reducer as settings } from "./settings"

export const reducer = combineReducers({ current, settings })
