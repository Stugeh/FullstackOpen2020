import React from 'react'

const User = ({ user }) => {
    if (!user){return null}
    return (
        <div>
            <h1>Blogs added by {user.username}</h1>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default User
