import React from 'react'
import Blog from './Blog'

//
// Calls the Blog renderer recursively to render all blogs in the list

const blogList = ({ blogs }) => (
    <div>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
)

export default blogList