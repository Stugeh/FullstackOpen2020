import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { setMessage, setError } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/formHook'

//
// displays the form  the addition of new blogs
//


// Handler functions = ({ target }) => setAttribute(target.value)
const BlogForm = () => {
  const dispatch = useDispatch()
  const { reset: titleReset, ...title } = useField('text', 'title')
  const { reset: authorReset, ...author } = useField('text', 'author')
  const { reset: urlReset, ...url } = useField('text', 'url')

  // event handler thats called when submit is pressed on BlogForm
  // adds new blog to database and shows a notification to the user.
  const addBlog = (event) => {
    if(window.localStorage.getItem('loggedInUser')){

      event.preventDefault()
      const blog = {
        title: title.value,
        author: author.value,
        url: url.value,
        likes: 0
      }
      dispatch(createBlog(blog))
      dispatch(setMessage('added new blog'))
      titleReset()
      authorReset()
      urlReset()
    } 
    else {
      dispatch(setError('You have to log in first'))
    }
  }

  return (
    <span>
      <Form className='blogForm' onSubmit={addBlog}>
        <h3>Add new blog</h3>
        <Form.Control {...title}/>
        <Form.Control {...author}/>
        <Form.Control {...url} />
        <Button variant='primary' type="submit">save</Button>
      </Form>
    </span>
  )
}
export default BlogForm