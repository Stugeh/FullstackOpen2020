import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";
import notifiReducer from "./reducers/notificationReducer";
//import togglableReducer from "./reducers/togglableReducer";

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notifiReducer,
    //togglable: togglableReducer,
    //user: userReducer
})

const Store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default Store