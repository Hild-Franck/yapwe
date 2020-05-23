import { GET_MOOD, GET_MOOD_SUCCESS, GET_MOOD_FAIL } from './actions'

export function getMood(month, year) {
  return {
    types: [GET_MOOD, GET_MOOD_SUCCESS, GET_MOOD_FAIL],
    promise: client => client.get(`/mood?month=${month}&year=${year}`)
  }
}