import {
  GET_MOOD, GET_MOOD_SUCCESS, GET_MOOD_FAIL,
  CREATE_MOOD, CREATE_MOOD_SUCCESS, CREATE_MOOD_FAIL,
  UPDATE_MOOD, UPDATE_MOOD_SUCCESS, UPDATE_MOOD_FAIL
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
    promise: client => client.post('/mood', { date: Date.UTC(year, month, day, 0), score })
  }
}

export function updateMood(day, month, year, score) {
  month += 1
  return {
    types: [UPDATE_MOOD, UPDATE_MOOD_SUCCESS, UPDATE_MOOD_FAIL],
    promise: client => client.post(`/mood/${year}-${month<9?'0':''}${month}-${day<10?'0':''}${day}`, { score })
  }
}