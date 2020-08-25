import React, { useRef } from 'react'
import Togglable from '../components/togglable'
//
//Renders a single blog in the list
//

const Blog = ({ blog }) => {

  const blogRef = useRef()

  return (
    <div className='blog'>
      Title: {blog.title}<br />
      Author: {blog.author}
      <Togglable buttonLabel='expand' ref={blogRef}>
        Likes: {blog.likes}
        <button >like</button><br />
        URL: {blog.url}<br />
      </Togglable>
      <br />
    </div >
  )
}

export default Blog
