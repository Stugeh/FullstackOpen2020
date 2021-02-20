import React from 'react'
import { useSelector } from 'react-redux'

//
// Calls the Blog renderer recursively to render all blogs in the list

const UserList = () => {
  const users = useSelector(state => state.users.allUsers)
  return(
      <div className='userList'>
        <h2>Users</h2>
        <table>
            <tr>
                <th>Username</th>
                <th>Blog Count</th>
            </tr>
            {users.map(user =>
                <tr>
                    <td>{user.username}</td>
                    <td>{user.blogs.length}</td>
                </tr>
            )}
        </table>
      </div>
  )
}

export default UserList