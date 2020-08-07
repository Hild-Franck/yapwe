import { reduce, clone } from 'lodash'

import {
	GET_MOOD, GET_MOOD_SUCCESS, GET_MOOD_FAIL,
	CREATE_MOOD, CREATE_MOOD_SUCCESS, CREATE_MOOD_FAIL,
	UPDATE_MOOD, UPDATE_MOOD_SUCCESS, UPDATE_MOOD_FAIL
} from './actions'

const initialState = {
	data: {},
	ids: [],
	loading: true
}

export const reducer = (state=initialState, action) => {
	let day = new Date()
	switch(action.type) {
		case GET_MOOD:
			return {
				...state,
				loading: true
			}
		case GET_MOOD_SUCCESS:
			return {
				...state,
				loading: false,
				ids: action.result.data.map(({ _id, day, month, year }) =>
					({ id: _id, day, month, year })),
				data: reduce(action.result.data, (acc, mood) =>
					({ ...acc, [mood._id]: mood })
				, {})
			}
		case GET_MOOD_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case CREATE_MOOD:
			return {
				...state,
				loading: true
			}
			case CREATE_MOOD_SUCCESS:
			return {
				...state,
				loading: false,
				ids: (({ _id, day, month, year }) => [
					...state.ids,
					{ id: _id, day, month, year }
				])(action.result.data),
				data: { ...state.data, [action.result.data._id]: action.result.data  }
			}
		case CREATE_MOOD_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case UPDATE_MOOD:
			return {
				...state,
				loading: true
			}
			case UPDATE_MOOD_SUCCESS:
			day = new Date(action.result.data.day)
			const updatedData = clone(state.data)
			updatedData[day.getUTCDate()] = { ...action.result.data, day }
			
			return {
				...state,
				data: updatedData
			}
		case UPDATE_MOOD_FAIL:
			return {
				...state,
				error: action.error
			}
		
		default:
			return state
	}
}
