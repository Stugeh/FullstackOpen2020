import React from 'react'
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import loginService from '../services/login'

import UserForm from '../components/userForm'
import Togglable from '../components/togglable'

import {login} from '../reducers/userReducer'
import  {setError, setMessage} from "../reducers/notificationReducer"

//
// Renders the login form
//

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

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
    history.push('/')
  } 

  
  

  return (
    <div className='login'>
      <Form className='loginForm' onSubmit={handleLogin}>
        <Form.Group>
          <Form.Control name="username" placeholder="Username" /> <br/>
          <Form.Control name="password" placeholder="password" type='password'/><br/>
          <Button variant='primary' type="submit">login</Button>
        </Form.Group>
      </Form>
      <Togglable className='newUser' buttonLabel='create user'>
        <h4>Create new user</h4>
        <UserForm />
      </Togglable>
    </div>
  )
}


export default LoginForm