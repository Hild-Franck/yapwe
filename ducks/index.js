import { reducer as mainReducer } from './main'
import { reducer as moodReducer } from './mood'
import { reducer as modalReducer } from './modal'
import { reducer as noteReducer } from './note'
import { reducer as habitReducer } from './habit'

export const reducers = {
  mainReducer,
  mood: moodReducer,
  modal: modalReducer,
  note: noteReducer,
  habit: habitReducer
}