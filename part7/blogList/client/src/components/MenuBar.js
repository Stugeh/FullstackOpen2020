import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import  {setMessage} from "../reducers/notificationReducer"
import {logout} from "../reducers/userReducer"
import {Button} from 'react-bootstrap'

const MenuBar = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const users = useSelector(state => state.users)

    const padding = {
        color: 'white',
        padding: '14px 10px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
    }

    // removes users token from local storage
    const logOut = () => {
        dispatch(logout())
        dispatch(setMessage('logged out'))
        history.push('/login')
    }

    const login = () => {
        history.push('/login')
    }
    
    return (
        <div className='topBar'>
            <Link style={padding} to='/'><h2>Blogs</h2></Link>
            <Link style={padding} to='/users'><h2>Users</h2></Link>
            {users.loggedInUser ? 
            <span className='logged'>
                {users.loggedInUser.username} logged in
                <Button variant='danger' className='logBtn' onClick={logOut}>log out</Button>
            </span>
            :
            <Button variant='success' className='logBtn'  onClick={login}>login</Button>}
        </div>
    )
}

export default MenuBar