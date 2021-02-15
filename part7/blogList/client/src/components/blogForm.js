import React from 'react'
import { useDispatch} from 'react-redux'

import {setMessage} from '../reducers/notificationReducer'
import {createBlog} from '../reducers/blogReducer'
//
// displays the form  the addition of new blogs
//


// Hndlr functions = ({ target }) => setAttribute(target.value)
const BlogForm = () => {
  const dispatch = useDispatch()
  
  // event handler thats called when submit is pressed on BlogForm
  // adds new blog to database and shows a notification to the user.
  const addBlog = (event) => {
    event.preventDefault()
    const e = event.target
    const blog = {
      title: e.title.value,
      author: e.author.value,
      url: e.url.value,
      likes: 0
    }
    dispatch(createBlog(blog))
    dispatch(setMessage('added new blog'))
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h3>Add new blog</h3>
        <input name='title' placeholder='title'/>
        <input name='author' placeholder='author'/>
        <input name='url' placeholder='URL' />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default BlogForm