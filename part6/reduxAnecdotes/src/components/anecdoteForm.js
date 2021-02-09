import React from 'react'
import { connect } from 'react-redux'
import {createNewAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    const createAnecdote = (event) => {
        event.preventDefault()
        const text = event.target.anecdoteText.value
        event.target.anecdoteText.value = ''
        props.createNewAnecdote(text)
        props.setNotification(`Created new anecdote: ${text}!`)
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

const mapDispatchToProps = {createNewAnecdote, setNotification}


export default connect(null, mapDispatchToProps)(AnecdoteForm)