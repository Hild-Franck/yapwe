import { reducer as mainReducer } from './main'
import { reducer as moodReducer } from './mood'
import { reducer as modalReducer } from './modal'

export const reducers = {
  mainReducer,
  mood: moodReducer,
  modal: modalReducer
}