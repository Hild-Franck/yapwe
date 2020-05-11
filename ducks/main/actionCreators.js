import { PAGE_NOT_FOUND, WELCOME, SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL } from './actions'

export const pageNotFound = () => ({
	type: PAGE_NOT_FOUND
})

export function sayWelcome(message) {
	return {
		type: WELCOME,
		payload: message
	}
}

export function signup(data) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: client => client.post('http://localhost:9000/auth/signup', { ...data })
  }
}