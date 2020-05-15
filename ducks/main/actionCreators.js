import {
	PAGE_NOT_FOUND, WELCOME, SET_USER,
	SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL,
	LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
	LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL,
	NEW_MESSAGE, REMOVE_MESSAGE
} from './actions'

export const pageNotFound = () => ({
	type: PAGE_NOT_FOUND
})

export function sayWelcome(message) {
	return {
		type: WELCOME,
		payload: message
	}
}

export function addMessage(message, severity) {
	return {
		type: NEW_MESSAGE,
		payload: { message, severity }
	}
}

export function removeMessage() {
	return {
		type: REMOVE_MESSAGE,
		payload: ''
	}
}

export function setUser(user) {
	return {
		type: SET_USER,
		payload: user
	}
}

export function signup(data) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: client => client.post('/auth/signup', { ...data })
  }
}

export function login(data) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client => client.post('/auth/login', { ...data })
  }
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: client => client.post('/auth/logout')
  }
}