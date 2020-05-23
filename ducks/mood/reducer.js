import { reduce, clone } from 'lodash'

import {
	GET_MOOD, GET_MOOD_SUCCESS, GET_MOOD_FAIL,
	CREATE_MOOD, CREATE_MOOD_SUCCESS, CREATE_MOOD_FAIL
} from './actions'

const initialState = {
	data: {},
	loading: true
}

export const reducer = (state=initialState, action) => {
	switch(action.type) {
		case GET_MOOD:
			return {
				...state,
				loading: true
			}
		case GET_MOOD_SUCCESS:
			return {
				...state,
				data: reduce(action.result.data, (acc, mood) => {
					const day = new Date(mood.day)
					acc[day.getUTCDate()] = { ...mood, day }
					return acc
				}, {})
			}
		case GET_MOOD_FAIL:
			return {
				...state,
				loading: false
			}
		case CREATE_MOOD:
			return {
				...state,
				loading: true
			}
		case CREATE_MOOD_SUCCESS:
			const day = new Date(action.result.data.day)
			const newData = clone(state.data)
			newData[day.getUTCDate()] = { ...action.result.data, day }
			
			return {
				...state,
				data: newData
			}
		case CREATE_MOOD_FAIL:
			return {
				...state,
				error: action.error
			}
		default:
			return state
	}
}
