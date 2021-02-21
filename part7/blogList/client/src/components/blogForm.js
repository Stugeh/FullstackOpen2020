import React from 'react'
import { useDispatch} from 'react-redux'
import { Table, Form, Button } from 'react-bootstrap'

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
    <span>
      <Form className='blogForm' onSubmit={addBlog}>
        <h3>Add new blog</h3>
          <Form.Control name='title' placeholder='title'/>
          <Form.Control name='author' placeholder='author'/>
          <Form.Control name='url' placeholder='URL' />
          <Button variant='primary' type="submit">save</Button>
      </Form>
    </span>
  )
}
export default BlogForm