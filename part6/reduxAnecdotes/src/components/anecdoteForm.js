import React from 'react'
import { useDispatch } from 'react-redux'
import {createNewAnecdote} from '../reducers/anecdoteReducer'



const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const text = event.target.anecdoteText.value
        event.target.anecdoteText.value = ''
        dispatch(createNewAnecdote(text))
    }

    return(
      <div>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div><input name='anecdoteText' /></div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
}

export default AnecdoteForm