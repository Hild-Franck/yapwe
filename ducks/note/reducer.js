import { reduce, clone, omit } from 'lodash'

import {
	GET_NOTE, GET_NOTE_SUCCESS, GET_NOTE_FAIL,
	CREATE_NOTE, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAIL,
	UPDATE_NOTE, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAIL,
	DELETE_NOTE, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAIL
} from './actions'

const initialState = {
	data: {},
	ids: [],
	loading: true
}

export const reducer = (state=initialState, action) => {
	let day = new Date()
	switch(action.type) {
		case GET_NOTE:
			return {
				...state,
				loading: true
			}
		case GET_NOTE_SUCCESS:
			return {
				...state,
				loading: false,
				ids: action.result.data.map(({ _id, day, month, year }) =>
					({ id: _id, day, month, year })),
				data: reduce(action.result.data, (acc, note) =>
					({ ...acc, [note._id]: note })
				, {})
			}
		case GET_NOTE_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case CREATE_NOTE:
			return {
				...state,
				loading: true
			}
			case CREATE_NOTE_SUCCESS:
			return {
				...state,
				loading: false,
				ids: (({ _id, day, month, year }) => [
					...state.ids,
					{ id: _id, day, month, year }
				])(action.result.data),
				data: { ...state.data, [action.result.data._id]: action.result.data  }
			}
		case CREATE_NOTE_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case UPDATE_NOTE:
			return {
				...state,
				loading: true
			}
			case UPDATE_NOTE_SUCCESS:
				return {
					...state,
					loading: false,
					data: { ...state.data, [action.result.data._id]: action.result.data }
				}
		case UPDATE_NOTE_FAIL:
			return {
				...state,
				error: action.error
			}
		case DELETE_NOTE:
			return {
				...state,
				loading: true
			}
		case DELETE_NOTE_SUCCESS:
			return {
				...state,
				loading: false,
				ids: state.ids.filter(id => id.id !== action.result.data._id),
				data: omit(state.data, [action.result.data._id]),
			}
		case DELETE_NOTE_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			}
		default:
			return state
	}
}
