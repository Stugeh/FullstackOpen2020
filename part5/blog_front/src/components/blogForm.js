import React, { useState } from 'react'
import blogService from '../services/blogs'

//
// displays the form  the addition of new blogs
//


// Hndlr functions = ({ target }) => setAttribute(target.value)
const BlogForm = ({ setMessage, blogs, setBlogs }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleTitle = (event) => setTitle(event.target.value)
    const handleAuthor = (event) => setAuthor(event.target.value)
    const handleUrl = (event) => setUrl(event.target.value)

    // event handler thats called when submit is pressed on BlogForm
    // adds new blog to database and shows a notification to the user.
    const addBlog = (event) => {
        event.preventDefault()
        const blog = {
            title: title,
            author: author,
            url: url,
            likes: 0
        }
        setTitle(''); setAuthor(''); setUrl('');
        blogService.create(blog).then(res => { setBlogs(blogs.concat(res)) })
        setMessage('added new blog')
        setTimeout(() => { setMessage(null) }, 5000)
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <h3>Add new blog</h3>

                <div>
                    Title:
                    <input
                        type='text'
                        value={title}
                        name='title'
                        onChange={handleTitle}
                    />
                </div>

                <div>
                    Author:
                    <input
                        type='text'
                        value={author}
                        name='author'
                        onChange={handleAuthor}
                    />
                </div>

                <div>
                    url:
                    <input
                        type='text'
                        value={url}
                        name='url'
                        onChange={handleUrl}
                    />
                </div>

                <button type="submit">save</button>
            </form>
        </div>
    )
}
export default BlogForm