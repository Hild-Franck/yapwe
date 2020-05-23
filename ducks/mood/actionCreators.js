import {
  GET_MOOD, GET_MOOD_SUCCESS, GET_MOOD_FAIL,
  CREATE_MOOD, CREATE_MOOD_SUCCESS, CREATE_MOOD_FAIL
} from './actions'

export function getMood(month, year) {
  return {
    types: [GET_MOOD, GET_MOOD_SUCCESS, GET_MOOD_FAIL],
    promise: client => client.get(`/mood?month=${month}&year=${year}`)
  }
}

export function createMood(day, month, year, score) {
  return {
    types: [CREATE_MOOD, CREATE_MOOD_SUCCESS, CREATE_MOOD_FAIL],
    promise: client => client.post('/mood', { day: new Date(year, month, day, 0), score })
  }
}