import { combineReducers } from "redux"

import { reducer as registry } from "./registry"
import { reducer as page } from "./page"

export const reducer = combineReducers({ page, registry })
