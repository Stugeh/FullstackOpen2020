import anecdoteService from '../services/anecdotes'


//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  switch (action.type){
    case 'LIKE':
      const id = action.data.id
      state = state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
       // alphabetical order
      state = state.sort((a,b) => a.content < b.content ? 1 : -1)
      // sort by likes
      state = state.sort((a,b) => a.votes < b.votes ? 1 : -1)
      return state
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

/* ACTION CREATORS */ 

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
        type: 'INIT_ANECDOTES',
        data: anecdotes
      })
  }
}

export const addLike = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService
      .updateAnecdote({...anecdote, votes: anecdote.votes+1})
    dispatch({
          type: "LIKE",
          data: newAnecdote
      })
    }
}

export const createNewAnecdote = (text) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(text)
    dispatch({
        type: "CREATE",
        data: newAnecdote
    })
  }
}

export default reducer