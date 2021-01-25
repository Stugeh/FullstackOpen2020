import React, { useRef, useState } from 'react'
import Togglable from '../components/togglable'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
//
//Renders a single blog in the list
//



const Blog = ({ blog, setBlogs, testHandler = () => {} }) => {
  const [updatedBlog, setBlog] = useState(blog)
  const blogRef = useRef()

  const addLike = async (event) => {
    event.preventDefault()
    testHandler()
    try{
      const newBlog = {
        ...updatedBlog,
        likes: updatedBlog.likes + 1,
        user: updatedBlog.user.id
      }
      setBlog(await blogService.update(blog.id, newBlog))}
    catch(e){}
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
      <Togglable buttonLabel='expand' ref={blogRef} className="moreInfo">
        Likes: {updatedBlog.likes}
        <button onClick={addLike} >like</button><br />
        URL: {updatedBlog.url}<br />
        <button onClick={deleteBlog} >delete</button><br />
      </Togglable>
      <br />
    </div >
  )
}

Blog.displayName = 'Blog'
Blog.propTypes = {
  newBlog: PropTypes.object,
  updatedBlog: PropTypes.object,
  blog: PropTypes.object,
  setBlogs: PropTypes.func
}

export default Blog
