import React from 'react'

//
//Renders a single blog in the list
//

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default Blog
