import { combineReducers } from 'redux'

import { PAGE_NOT_FOUND, WELCOME } from './actions'

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

export const reducer = combineReducers({
	status: appStatus,
	welcome: welcomeReducer
})