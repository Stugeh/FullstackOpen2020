import React, { useRef, useState } from 'react'
import Togglable from '../components/togglable'
import blogService from '../services/blogs'

//
//Renders a single blog in the list
//



const Blog = ({ blog }) => {
  const [updatedBlog, setBlog] = useState(blog)
  const blogRef = useRef()

  const addLike = async (event) => {
    event.preventDefault()
    const newBlog = {
      ...updatedBlog,
      likes: updatedBlog.likes + 1,
      user: updatedBlog.user.id
    }
    setBlog(await blogService.update(blog.id, newBlog))
  }

  return (
    <div className='blog'>
      Title: {updatedBlog.title}<br />
      Author: {updatedBlog.author}
      <Togglable buttonLabel='expand' ref={blogRef}>
        Likes: {updatedBlog.likes}
        <button onClick={addLike} >like</button><br />
        URL: {updatedBlog.url}<br />
      </Togglable>
      <br />
    </div >
  )
}

export default Blog
