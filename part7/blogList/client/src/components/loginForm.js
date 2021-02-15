import React from 'react'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'

import {login} from '../reducers/userReducer'
import  {setError, setMessage} from "../reducers/notificationReducer"

//
// Renders the login form
//

const LoginForm = () => {
  const dispatch = useDispatch()

  // eventhandler for LoginForm submit.
  // tries to call loginService.login to verify params against database
  // if succesful sets the user, gives it a token and saves it in local storage.
  const handleLogin = async (event) => {
    event.preventDefault()
    const e = event.target
    try{
      const user = await loginService.login({
          username: e.username.value,
          password: e.password.value
        })
        dispatch(login(user))
        dispatch(setMessage('logged in'))
    }catch{
      dispatch(setError('login failed'))
    }
  } 

  
  

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input name="username" placeholder="Username"
        />
      </div>
      <div>
        <input name="password" placeholder="password" type='password'/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}


export default LoginForm