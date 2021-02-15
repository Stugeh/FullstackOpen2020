import React, { useRef } from 'react'
import Togglable from '../components/togglable'
import PropTypes from 'prop-types'

import { useDispatch} from 'react-redux'
import {likeBlog, deleteBlog} from '../reducers/blogReducer'
//
//Renders a single blog in the list
//



const Blog = ({ blog }) => {
  const blogRef = useRef()
  const dispatch = useDispatch()
  
  const removeBlog = async () => {
    if (window.confirm(`delete blog ${blog.title}?`)) {
        dispatch(deleteBlog(blog))
    }
  }

  const addLike = async () => {
    dispatch(likeBlog(blog))
  }
  return (
    <div className='blog'>
      Title: {blog.title}<br />
      Author: {blog.author}
      <Togglable buttonLabel='expand' ref={blogRef} className="moreInfo">
        Likes: {blog.likes}
        <button onClick={addLike} id='likeBtn'>like</button><br />
        URL: {blog.url}<br />
        <button onClick={removeBlog} >delete</button><br />
      </Togglable>
      <br />
    </div >
  )
}

Blog.displayName = 'Blog'
Blog.propTypes = {
  blog: PropTypes.object,
}

export default Blog
