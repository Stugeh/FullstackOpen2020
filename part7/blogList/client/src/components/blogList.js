import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

//
// Calls the Blog renderer recursively to render all blogs in the list

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  return(
      <div className='blogList'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
  )
}

export default BlogList