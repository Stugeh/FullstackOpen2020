import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {likeBlog, deleteBlog} from '../reducers/blogReducer'
//
//Renders a single blog in the list
//



const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedInAs = useSelector(state => state.users.loggedInUser)
  
  const removeBlog = async () => {
    if (window.confirm(`delete blog ${blog.title}?`)) {
        dispatch(deleteBlog(blog))
    }
  }

  const addLike = async () => {
    dispatch(likeBlog(blog))
  }


  if (!blog){return null}

  return (
    <div className='blog'>
      <Card className='card'>
        <Card.Header>
          <h1>{blog.title}</h1>
          <Button className='cardBtn' variant='primary' href={blog.url}>Source</Button>
        </Card.Header>  
        <div className='inline'>
          Likes: {blog.likes} 
          <Button className='cardBtn' onClick={addLike} id='likeBtn'>like</Button>
        </div>
        
        {console.log('blog.user :>> ', blog.user)}
        added by:{blog.user.username}
        {loggedInAs.username === blog.user.username ? (
          <span>
            <Button variant='danger' onClick={removeBlog} >delete</Button><br />
          </span>
          )
          : <div/>
        }
      </Card>
    </div >
  )
}

export default Blog
