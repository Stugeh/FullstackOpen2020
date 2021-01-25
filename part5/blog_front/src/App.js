import React, { useState, useEffect } from 'react'
import BlogList from './components/blogList'
import blogService from './services/blogs'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'
import Notification from './components/notification'
import UserForm from './components/userForm'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  //effect loop to retrieve list of blogs from database.
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes - b.likes).reverse())
    )
  }, [])

  // effect loop to retrieve logged in user from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // removes users token from local storage
  const logOut = () => {
    console.log('logging out')
    setMessage('logged out')
    setTimeout(() => { setMessage(null) }, 5000)
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const createBlog = (blog) => {
    blogService.create(blog).then(res => { setBlogs(blogs.concat(res)) })
    setMessage('added new blog')
    setTimeout(() => { setMessage(null) }, 5000)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} errorMsg={errorMsg} />
      {user === null ? (
        <div>
          <LoginForm setMessage={setMessage} setErrorMsg={setErrorMsg} setUser={setUser} />
          <Togglable buttonLabel='create user'>
            <h4>Create new user</h4>
            <UserForm setMessage={setMessage} setErrorMsg={setErrorMsg} />
          </Togglable>
        </div>
      )
        :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logOut}>log out</button>
          <Togglable buttonLabel='add a new blog'>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <h2>Blogs</h2>
          <BlogList blogs={blogs} setBlogs={setBlogs} />
        </div>
      }
    </div>
  )
}

export default App