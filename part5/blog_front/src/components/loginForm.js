import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

//
// Renders the login form
//

const LoginForm = ({ setMessage, setErrorMsg, setUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsername = (event) => setUsername(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  // eventhandler for LoginForm submit.
  // tries to call loginService.login to verify params against database
  // if succesful sets the user, gives it a token and saves it in local storage.
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMessage('logged in')
      setTimeout(() => { setMessage(null) }, 5000)
    } catch (exception) {
      console.log('exception :>> ', exception)
      setErrorMsg('wrong credentials')
      setTimeout(() => { setErrorMsg(null) }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          value={username}
          placeholder="Username"
          id="username"
          onChange={handleUsername}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="Password"
          id="password"
          onChange={handlePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm