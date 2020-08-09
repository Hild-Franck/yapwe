import {
  GET_NOTE, GET_NOTE_SUCCESS, GET_NOTE_FAIL,
  CREATE_NOTE, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAIL,
  UPDATE_NOTE, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAIL,
  DELETE_NOTE, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAIL
} from './actions'

export function getNote(month, year) {
  return {
    types: [GET_NOTE, GET_NOTE_SUCCESS, GET_NOTE_FAIL],
    promise: client => client.get(`/note?month=${month}&year=${year}`)
  }
}

export function createNote(day, month, year, text, important) {
  return {
    types: [CREATE_NOTE, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAIL],
    promise: client => client.post('/note', { date: Date.UTC(year, month, day, 0), text, important })
  }
}

export function updateNote(id, text) {
  return {
    types: [UPDATE_NOTE, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAIL],
    promise: client => client.post(`/note/${id}`, { text })
  }
}

export function deleteNote(id) {
  return {
    types: [DELETE_NOTE, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAIL],
    promise: client => client.delete(`/note/${id}`)
  }
}