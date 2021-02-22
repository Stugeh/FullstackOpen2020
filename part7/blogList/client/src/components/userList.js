import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
//
// Calls the Blog renderer recursively to render all blogs in the list

const UserList = () => {
  const users = useSelector(state => state.users.allUsers)
  return(
    <div className='userList'>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blog Count</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.username}`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList