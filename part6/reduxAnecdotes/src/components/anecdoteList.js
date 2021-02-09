import React from 'react'
import { connect } from 'react-redux'
import {addLike} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'



const AnecdoteList = (props) => {    
    const vote = (anecdote) => {
        props.addLike(anecdote)
        props.setNotification(`Liked anecdote: ${anecdote.content}`)
      }

    return(
    <div>
        {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => ({
  // Filter anecdotes by what is in the searchbox
  anecdotes: state.anecdotes
              .filter(anecdote => 
                  anecdote.content.toLowerCase().includes(state.filter))
})

const mapDispatchToProps = {addLike, setNotification}


export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)