import { combineReducers } from 'redux'

import {
	PAGE_NOT_FOUND, WELCOME,
	SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL,
	LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
	NEW_MESSAGE, REMOVE_MESSAGE
} from './actions'

// only used in SSR to know if NotFoundPage is reached
const appStatus = (state = 200, action) => {
	switch (action.type) {
	case PAGE_NOT_FOUND:
		return 404
	default:
		return state
	}
}

const welcomeReducer = (state = { message: 'Test' }, action) => {
	switch (action.type) {
	case WELCOME:
		return {
			...state,
			message: action.payload
		}
	default:
		return state
	}
}

const notificationReducer = (state = { message: '' }, action) => {
	switch (action.type) {
		case NEW_MESSAGE:
			return {
				...state,
				message: action.payload.message,
				severity: action.payload.severity || 'success'
			}
		case REMOVE_MESSAGE:
			return {
				...state,
				message: '',
				severity: 'success'
			}
		default:
			return state
	}
}

const authReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case SIGNUP:
      return {
        ...state,
        signingUp: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
				signupError: null
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        signingUp: false,
        signupError: action.error
			}
			case LOGIN:
				return {
					...state,
					loginUp: true
				}
			case LOGIN_SUCCESS:
				return {
					...state,
					loginUp: false,
					user: action.result,
					loginError: null
				}
			case LOGIN_FAIL:
				return {
					...state,
					loginUp: false,
					user: null,
					loginError: action.error
				}
		default:
			return state
	}
}

export const reducer = combineReducers({
	status: appStatus,
	welcome: welcomeReducer,
	auth: authReducer,
	notification: notificationReducer
})
