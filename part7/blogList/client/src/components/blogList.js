import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'
//
// Calls the Blog renderer recursively to render all blogs in the list

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const style = {
    border: 'solid',
    padding: 5,
    borderWidth: 1
  }
  return(
      <div className='blogList'>
        <Table striped>
          <tbody>
            {blogs.map(blog =>
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

export default BlogList