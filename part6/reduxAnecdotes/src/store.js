import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})

const Store = createStore(reducer, composeWithDevTools())

export default Store