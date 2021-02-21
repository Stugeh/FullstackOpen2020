import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom"
/* COMPONENTS */
import BlogList from './components/blogList'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'
import Notification from './components/notification'
import UserForm from './components/userForm'
import UserList from './components/userList'
import User from './components/user'
import Blog from './components/Blog'
import MenuBar from './components/MenuBar'
/* REDUCER ACTION CREATORS */
import  {initializeBlogs} from "./reducers/blogReducer"
import {retrieveUser, initializeUsers} from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  
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

  const matchUser = useRouteMatch('/users/:username')
  const userToRender = matchUser ? users.allUsers
  .find(a => a.username ===matchUser.params.username) : null
  
  const matchBlog = useRouteMatch('/blogs/:id')
  const blogToRender = matchBlog ? blogs.find(a => a.id === matchBlog.params.id) : null
  
  return (
    <div className='container'>
      <MenuBar />
      <h1>Blogs</h1>
      <Notification />

      <Switch>
        <Route path='/login'>
            <div>
              <LoginForm />
              <Togglable buttonLabel='create user'>
                <h4>Create new user</h4>
                <UserForm />
              </Togglable>
            </div>
        </Route>

        <Route path='/' exact>
          <div>    
              <Togglable buttonLabel='add a new blog'>
                <BlogForm />
              </Togglable>
              <BlogList />
            </div>
        </Route>

        <Route path='/users' exact>
          <UserList />
        </Route>
        
        <Route path='/users/:username'>
          <User user={userToRender} />
        </Route>

        <Route path='/blogs/:id'>
          <Blog blog={blogToRender} />
        </Route>
      </Switch>
    </div>
  )
}

export default App