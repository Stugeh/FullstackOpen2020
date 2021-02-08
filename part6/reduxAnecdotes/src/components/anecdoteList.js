import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addLike} from '../reducers/anecdoteReducer'
import {clearNotification, likeNotif} from '../reducers/notificationReducer'



const AnecdoteList = () => {
  const anecdotes = useSelector((state) => 
    state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(state.filter)
  ))
    
    const dispatch = useDispatch()
    
    const vote = (id, content) => {
        dispatch(addLike(id))
        dispatch(likeNotif(content))
        setTimeout( () => { dispatch( clearNotification() ) }, 5000 )
      }

    return(
    <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
          )}
    </div>
    )
}

export default AnecdoteList