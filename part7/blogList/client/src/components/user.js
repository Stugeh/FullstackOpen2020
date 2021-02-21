import React from 'react'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'

const User = ({ user }) => {
    const style = {
        border: 'solid',
        padding: 5,
        borderWidth: 1
      }

    if (!user){return null}
    return(
        <div className='blogList'>
          <h1>Blogs added by {user.username}</h1>
          <Table striped>
            <tbody>
              {user.blogs.map(blog =>
                <tr key={blog.id}>
                  <td style={style}>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </td>  
                </tr>
              )}
            </tbody>
          </Table>
        </div>
    )
}

export default User
