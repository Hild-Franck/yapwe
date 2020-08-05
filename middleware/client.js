import apiClient from '../apiClient'
import { addMessage } from '../ducks/main'

const clientMiddleware = () => ({dispatch, getState}) => next => action => {
	if (typeof action === 'function') return action(dispatch, getState)

	const { promise, types, ...rest } = action // eslint-disable-line no-redeclare
	if (!promise) return next(action)

	const [REQUEST, SUCCESS, FAILURE] = types
	next({...rest, type: REQUEST})

	const actionPromise = promise(apiClient)
	actionPromise.then(
		({ body }) => {
			body.message && dispatch(addMessage(body.message, "success"))
			return next({...rest, result: body, type: SUCCESS})
		},
		error => {
			dispatch(addMessage(error.response.body.message, "error"))
			return next({...rest, error: error.response.body, type: FAILURE})
		}
	).catch(error => {
		dispatch(addMessage(`MIDDLEWARE ERROR: ${error}`, 'error'))
		next({...rest, error, type: FAILURE})
	})
	return actionPromise
}

export default clientMiddleware