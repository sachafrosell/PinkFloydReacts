import { createStore, combineReducers } from 'redux'
import playerReducer from '../components/player/reducer'
import mapReducer from '../components/map/reducer'
import startReducer from '../components/start/reducer'
import textReducer from '../components/text/reducer'
import quizReducer from '../components/quiz/reducer'

const rootReducer = combineReducers({
  player: playerReducer,
  map: mapReducer,
  start: startReducer,
  text: textReducer,
  quiz: quizReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
