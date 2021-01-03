import React, { useRef, useState } from 'react'
import Togglable from '../components/togglable'
import blogService from '../services/blogs'

//
//Renders a single blog in the list
//



const Blog = ({ blog, setBlogs }) => {
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

  const deleteBlog = async () => {
    if (window.confirm(`delete blog ${blog.title}?`)) {
      setBlog(await blogService.removeBlog(blog.id))
      setBlogs(await blogService.getAll())
    }

    //hide remove if not adder of blog
  }

  return (
    <div className='blog'>
      Title: {updatedBlog.title}<br />
      Author: {updatedBlog.author}
      <Togglable buttonLabel='expand' ref={blogRef}>
        Likes: {updatedBlog.likes}
        <button onClick={addLike} >like</button><br />
        URL: {updatedBlog.url}<br />
        <button onClick={deleteBlog} >delete</button><br />
      </Togglable>
      <br />
    </div >
  )
}

export default Blog
