import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogFormReducer from "./reducers/blogFormReducer";
import blogListReducer from "./reducers/blogListReducer";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginFormReducer";
import notifiReducer from "./reducers/notificationReducer";
import togglableReducer from "./reducers/togglableReducer";
import userFormReducer from "./reducers/userFormReducer";

const reducer = combineReducers({
    blogList: blogListReducer,
    loginForm: loginReducer,
    blogForm: blogFormReducer,
    blog: blogReducer,
    notification: notifiReducer,
    togglable: togglableReducer,
    userForm: userFormReducer
})

const Store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default Store