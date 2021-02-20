import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom"
/* COMPONENTS */
import BlogList from './components/blogList'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'
import Notification from './components/notification'
import UserForm from './components/userForm'
import UserList from './components/userList'
/* REDUCER ACTION CREATORS */
import  {setMessage} from "./reducers/notificationReducer"
import  {initializeBlogs} from "./reducers/blogReducer"
import {retrieveUser, logout, initializeUsers} from "./reducers/userReducer"

const App = () => {
  const user = useSelector(state => state.users.loggedInUser)
  const dispatch = useDispatch()
  //effect loop to retrieve list of blogs from database.
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  // effect loop to retrieve logged in user from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) { dispatch(retrieveUser(JSON.parse(loggedUserJSON))) }
  },[dispatch])
 
  // removes users token from local storage
  const logOut = () => {
    dispatch(logout())
    dispatch(setMessage('logged out'))
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <Switch>
        
        <Route path='/' exact>

          {user === null ? (
            <div>
              <LoginForm />
              <Togglable buttonLabel='create user'>
                <h4>Create new user</h4>
                <UserForm />
              </Togglable>
            </div>
          ) :
          <div>
              <p>{user.name} logged in</p>
              <button onClick={logOut}>log out</button>
              <Togglable buttonLabel='add a new blog'>
                <BlogForm />
              </Togglable>
              <h2>Blogs</h2>
              <BlogList />
            </div>
          }
        </Route>

        <Route path='/users' exact>
          <UserList />
        </Route>

      </Switch>
    </div>
  )
}

export default App