import { reduce } from 'lodash'

import { GET_MOOD, GET_MOOD_SUCCESS, GET_MOOD_FAIL } from './actions'

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
					acc[day.getDate()] = { ...mood, day }
					return acc
				}, {})
			}
		case GET_MOOD_FAIL:
			return {
				...state,
				loading: false
			}
		default:
			return state
	}
}
