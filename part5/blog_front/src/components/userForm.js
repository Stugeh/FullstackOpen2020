import React, { useState } from 'react'
import userService from '../services/users'

//
// renders new user form
//

const UserForm = ({ setMessage, setErrorMsg }) => {

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
        setUsername(''); setPassword(''); setName('');
        try {
            const response = await userService.create(user)
            if (response.status === 200) {
                setMessage('New user created')
                setTimeout(() => { setMessage(null) }, 5000)
            }
        } catch (exception) {
            setErrorMsg('user creation failed')
            setTimeout(() => { setErrorMsg(null) }, 5000)
        }
    }





    return (
        <form onSubmit={addUser}>
            <div>
                new username:
                <input
                    type="text"
                    value={username}
                    name="new username"
                    onChange={handleUsername}
                />
            </div>
            <div>
                password:
                <input
                    type="text"
                    value={password}
                    name="new password"
                    onChange={handlePassword}
                />
            </div>
            <div>
                Name:
                <input
                    type="text"
                    value={name}
                    name="new name"
                    onChange={handleName}
                />
            </div>
            <button type="submit">create new user</button>
        </form>
    )
}
export default UserForm