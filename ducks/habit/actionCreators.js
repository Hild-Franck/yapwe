import {
  GET_HABIT, GET_HABIT_SUCCESS, GET_HABIT_FAIL,
  CREATE_HABIT, CREATE_HABIT_SUCCESS, CREATE_HABIT_FAIL,
  UPDATE_HABIT, UPDATE_HABIT_SUCCESS, UPDATE_HABIT_FAIL
} from './actions'

export function getHabits(month, year) {
  return {
    types: [GET_HABIT, GET_HABIT_SUCCESS, GET_HABIT_FAIL],
    promise: client => client.get(`/habit?month=${month}&year=${year}`)
  }
}

export function createHabit(desc) {
  return {
    types: [CREATE_HABIT, CREATE_HABIT_SUCCESS, CREATE_HABIT_FAIL],
    promise: client => client.post('/habit', { desc })
  }
}

export function updateHabit(day, month, year, id, done) {
  month += 1
  return {
    types: [UPDATE_HABIT, UPDATE_HABIT_SUCCESS, UPDATE_HABIT_FAIL],
    promise: client => client.post(`/habit/achieve/${id}/${year}-${month<9?'0':''}${month}-${day<10?'0':''}${day}`, { done })
  }
}