import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Button, Card, Form} from 'react-bootstrap'
import {likeBlog, deleteBlog, addComment} from '../reducers/blogReducer'
import {useField} from '../hooks/formHook'
//
//Renders a single blog in the list
//

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const {reset: commentReset, ...comment} = useField('text', 'comment')
  const loggedInAs = useSelector(state => state.users.loggedInUser)
  
  const removeBlog = async () => {
    if (window.confirm(`delete blog ${blog.title}?`)) {
        dispatch(deleteBlog(blog))
    }
  }

  const addLike = async () => {
    dispatch(likeBlog(blog))
  }

  const submitComment = () => {
    dispatch(addComment(comment.value, blog))
  }

  if (!blog){return null}

  return (
    <div className='blog'>
      <Card className='blogCard'>
        <Card.Header>
          <h1>{blog.title}</h1>
          <Button className='cardBtn' variant='primary' href={blog.url}>Source</Button>
        </Card.Header>  
        <div className='inline'>
          Likes: {blog.likes} 
          <Button className='cardBtn' onClick={addLike} id='likeBtn'>like</Button>
        </div>
        added by:{blog.user.username}
        {loggedInAs.username === blog.user.username ? (
          <span>
            <Button variant='danger' onClick={removeBlog} >delete</Button><br />
          </span>
          )
          : <div/>
        }
      </Card>
      <div class='card' style={{'width': '60rem'}}>
        <div class='card-header'><h3>Comments</h3></div>
          <ul class="list-group list-group-flush">
            {blog.comments.map( comment => 
                <li class='list-group-item'>{comment}</li>
            )}
          </ul>
      </div>
      <Form>
        <Form.Control {...comment}/>
        <Button variant='success' onClick={submitComment}>Submit</Button>
      </Form>
    </div >
  )
}

export default Blog
