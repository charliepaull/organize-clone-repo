import { createStore, combineReducers } from 'redux'
import login from './login/reducer'
import analytics from './analytics/reducer'

const rootReducer = combineReducers({
	login,
	analytics,
})

const store = createStore(
	rootReducer,
)

export default store; 