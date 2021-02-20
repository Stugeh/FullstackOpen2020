import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {likeBlog, deleteBlog} from '../reducers/blogReducer'
//
//Renders a single blog in the list
//



const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedInAs = useSelector(state => state.users.loggedInUser)
  
  const removeBlog = async () => {
    if (window.confirm(`delete blog ${blog.title}?`)) {
        dispatch(deleteBlog(blog))
    }
  }

  const addLike = async () => {
    dispatch(likeBlog(blog))
  }

  if (!blog){return null}

  return (
    <div className='blog'>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} 
      <button onClick={addLike} id='likeBtn'>like</button> <br />
      added by:{blog.user.username}
      {loggedInAs.username === blog.user.username ? (
        <div>
          <button onClick={removeBlog} >delete</button><br />
        </div>
        )
        : <div/>
      }
    </div >
  )
}

export default Blog
