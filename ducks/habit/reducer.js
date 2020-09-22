import { reduce, clone } from 'lodash'

import {
	GET_HABIT, GET_HABIT_SUCCESS, GET_HABIT_FAIL,
	CREATE_HABIT, CREATE_HABIT_SUCCESS, CREATE_HABIT_FAIL,
	UPDATE_HABIT, UPDATE_HABIT_SUCCESS, UPDATE_HABIT_FAIL
} from './actions'

const initialState = {
	data: {},
	ids: [],
	loading: true
}

export const reducer = (state=initialState, action) => {
	switch(action.type) {
		case GET_HABIT:
			return {
				...state,
				loading: true
			}
		case GET_HABIT_SUCCESS:
			return {
				...state,
				loading: false,
				ids: action.result.data.map(({ _id }) => _id),
				data: reduce(action.result.data, (acc, habit) =>
					({ ...acc, [habit._id]: { ...habit, dates: habit.dates.reduce((acc, date) => {
						acc[new Date(date.date).getTime()] = date
						return acc
					}, {}) } })
				, {})
			}
		case GET_HABIT_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case CREATE_HABIT:
			return {
				...state,
				loading: true
			}
			case CREATE_HABIT_SUCCESS:
			return {
				...state,
				loading: false,
				ids: [ ...state.ids, action.result.data._id ],
				data: { ...state.data, [action.result.data._id]: { ...action.result.data, dates: {} }  }
			}
		case CREATE_HABIT_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case UPDATE_HABIT:
			return {
				...state,
				loading: true
			}
			case UPDATE_HABIT_SUCCESS:
				return {
					...state,
					loading: false,
					data: { ...state.data, [action.result.data._id]: { ...state.data[action.result.data._id], dates: { ...state.data[action.result.data._id].dates, [new Date(action.result.data.date).getTime()]: action.result.data } } }
				}
		case UPDATE_HABIT_FAIL:
			return {
				...state,
				error: action.error
			}
		
		default:
			return state
	}
}
