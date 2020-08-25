import React, { useState, useEffect } from 'react'
import BlogList from './components/blogList'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //effect loop to retrieve list of blogs from database.
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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


  // eventhandler for LoginForm. 
  // tries to call loginService.login to verify params against database
  // if succesful sets the user, gives it a token and saves it in local storage.
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('logged in')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMsg('wrong credentials')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  // event handler thats called when submit is pressed on BlogForm
  // adds new blog to database and shows a notification to the user.
  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    blogService.create(blog)
      .then(res => { setBlogs(blogs.concat(res)) })
    setMessage('added new blog')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // removes users token from local storage 
  const logOut = () => {
    console.log('logging out')
    setMessage('logged out')
    setTimeout(() => { setMessage(null) }, 5000)
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} errorMsg={errorMsg} />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          usrHndlr={({ target }) => setUsername(target.value)}
          pwHndlr={({ target }) => setPassword(target.value)}
          submitHndlr={handleLogin}
        />
        :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logOut}>log out</button>
          <Togglable buttonLabel='add a new blog'>
            <BlogForm
              title={title}
              author={author}
              url={url}
              titleHndlr={({ target }) => setTitle(target.value)}
              authorHndlr={({ target }) => setAuthor(target.value)}
              urlHndlr={({ target }) => setUrl(target.value)}
              submitHndlr={addBlog}
            />
          </Togglable>
          <h2>Blogs</h2>
          <BlogList blogs={blogs} />

        </div>
      }
    </div>
  )
}

export default App