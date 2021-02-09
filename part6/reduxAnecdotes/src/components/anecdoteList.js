import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addLike} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'



const AnecdoteList = () => {
  const anecdotes = useSelector((state) => 
    state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(state.filter)
  ))
    
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
        dispatch(addLike(anecdote))
        dispatch(setNotification(`Liked anecdote: ${anecdote.content}`))
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
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
    </div>
    )
}

export default AnecdoteList