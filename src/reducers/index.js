import { combineReducers } from 'redux'
import appReducer from './app/app_reducer'
import chatReducer from './chat/chat_reducer'
import adsReducer from './advertisements/ads_reducer'
import authReducer from './auth/auth_reducer'

// takes all your seperate reducers into one giant reducer
// each Redux action will flow through each middleware and then reach the reducers
// then it will go through each reducer
const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	chat: chatReducer,
	advertisements: adsReducer,
})

export default rootReducer
