import React, { useState } from 'react'

//
// displays the form  the addition of new blogs
//


// Hndlr functions = ({ target }) => setAttribute(target.value)
const BlogForm = ({ createBlog }) => {
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
    createBlog(blog)
    setTitle(''); setAuthor(''); setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h3>Add new blog</h3>

        <div>
          <input
            id='title'
            type='text'
            value={title}
            placeholder='title'
            onChange={handleTitle}
          />
        </div>

        <div>
          <input
            id='author'
            type='text'
            value={author}
            placeholder='author'
            onChange={handleAuthor}
          />
        </div>

        <div>
          <input
            id='url'
            type='text'
            value={url}
            placeholder='url'
            onChange={handleUrl}
          />
        </div>

        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default BlogForm