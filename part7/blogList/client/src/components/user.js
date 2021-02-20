import React from 'react'
import {Link} from 'react-router-dom'

const User = ({ user }) => {
    const style = {
        border: 'solid',
        padding: 5,
        borderWidth: 1
      }

    if (!user){return null}
    return(
        <div className='blogList'>
          <table>
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
          </table>
        </div>
    )
}

export default User
