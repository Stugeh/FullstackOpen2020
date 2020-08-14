import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, errorMsg }) => {
  if (message !== null) {
    return (
      <div className="message">
        {message}
      </div>
    )
  }
  if (errorMsg !== null) {
    return (
      <div className="error">
        {errorMsg}
      </div>
    )
  } else { return (null) }
}

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
            <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
            <input
          type="text"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )


  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h3>Add new blog</h3>

      <div>
        Title:
        <input
          type='text'
          value={title}
          name='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        Author:
        <input
          type='text'
          value={author}
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url:
        <input
          type='text'
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">save</button>
    </form>
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

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
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logOut}>log out</button>
          {blogForm()}
          <h2>Blogs</h2>
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App