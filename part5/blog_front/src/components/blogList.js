import React from 'react'
import Blog from './Blog'

//
// Calls the Blog renderer recursively to render all blogs in the list

const blogList = ({ blogs, setBlogs }) => (
    <div>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
        )}
    </div>
)

export default blogList