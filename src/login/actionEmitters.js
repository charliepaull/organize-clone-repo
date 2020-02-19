import {
	LOGIN_UPDATE_USER_INFO,
	LOGIN_DELETE_USER_INFO,
} from './actionTypes'

export const updateUserInfo = (token, username) => ({
	type: LOGIN_UPDATE_USER_INFO,
	token: token,
	username: username,
})

export const deleteUserInfo = () => ({
	type: LOGIN_DELETE_USER_INFO
})

