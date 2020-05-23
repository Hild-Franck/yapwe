import { reducer as mainReducer } from './main'
import { reducer as moodReducer } from './mood'

export const reducers = {
  mainReducer,
  mood: moodReducer
}