import { 
	LOGIN_UPDATE_USER_INFO,
	LOGIN_DELETE_USER_INFO,
} from './actionTypes'

const initial_state = {
	'token': undefined,
	'username': undefined,
}

const login = (state=initial_state, action) => {
	switch (action.type) {
		case LOGIN_UPDATE_USER_INFO:
			let c = Object.assign({}, state, {
				username: action.username,
				token: action.token,
			})
			console.log(c)
			return c
		case LOGIN_DELETE_USER_INFO:
			return Object.assign({}, initial_state)
		default:
			return state
	}
}

export default login