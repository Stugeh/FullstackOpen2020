import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import userService from '../services/users'

import  { setError, setMessage } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
//
// renders new user form
//

const UserForm = () => {

  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const handleUsername = (event) => setUsername(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)
  const handleName = (event) => setName(event.target.value)

  // eventhandler for UserForm submit
  // tries to call loginService.login to verify params against database
  // if succesful sets the user, gives it a token and saves it in local storage.
  const addUser = async (event) => {
    event.preventDefault()
    const user = {
      username: username,
      password: password,
      name: name
    }
    setUsername(''); setPassword(''); setName('')
    try {
      const response = await userService.create(user)
      if (response.status === 200) {
        dispatch(setMessage('User created'))
      }
    } catch (exception) {
      dispatch(setError('user creation failed'))
    }
  }

  return (
    <Form className='userCreateForm' onSubmit={addUser}>

      <Form.Control
        placeholder = 'New username'
        value={username}
        name="new username"
        onChange={handleUsername}
      />

      <Form.Control
        placeholder = 'New Password'
        value={password}
        name="new password"
        onChange={handlePassword}
      />


      <Form.Control
        placeholder = 'Name'
        value={name}
        name="new name"
        onChange={handleName}
      />
      <Button type="submit">create new user</Button>
    </Form>
  )
}
export default UserForm